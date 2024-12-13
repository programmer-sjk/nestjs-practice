import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Lock } from 'redlock';
import { DataSource } from 'typeorm';
import { CoachRepository } from '../coach/coach.repository';
import { hash, random } from '../common/crypt';
import { DayUtil } from '../common/day-util';
import { RedisService } from '../redis/redis.service';
import { AddLessonRequest } from './dto/add-lesson-request';
import { AddLessonResponse } from './dto/add-lesson-response';
import { LessonTimePeriod } from './dto/lesson-time-period';
import { LessonTimesRequest } from './dto/lesson-times-request';
import { LessonTimesResponse } from './dto/lesson-times-response';
import { RemoveLessonRequest } from './dto/remove-lesson-request';
import { LessonTime } from './entities/lesson-time.entity';
import { Lesson } from './entities/lesson.entity';
import { ReservablePeriod } from './enums/reservable-period.enum';
import { LessonRepository } from './repositories/lesson.repository';

@Injectable()
export class LessonService {
  private readonly LESSON_MINUTE = 60;
  private readonly PASSWORD_LENGTH = 8;
  private readonly ALL_LESSON_TIMES = this.getAllLessonTimes();
  private readonly CACHE_LESSON_TIME_PREFIX = 'lesson-time';
  private readonly CACHE_TTL = 60 * 60 * 1000; // 1h

  constructor(
    private readonly dataSource: DataSource,
    private readonly redisService: RedisService,
    private readonly lessonRepository: LessonRepository,
    private readonly coachRepository: CoachRepository,
  ) {}

  async findAvailableLessons(request: LessonTimesRequest) {
    const coach = await this.coachRepository.findOneByOrFail({
      id: request.coachId,
    });

    const cacheKey = `${this.CACHE_LESSON_TIME_PREFIX}:${coach.id}`;
    const cached = await this.redisService.get(cacheKey);

    if (cached) {
      return cached;
    }

    const lessons = await this.findInProgressLessons(coach.id);
    const lessonTimes = lessons.flatMap(this.convertLessonTimeByType);

    const avaliableTimes = this.ALL_LESSON_TIMES.filter((time) =>
      this.isAvailableTime(time, lessonTimes),
    );
    await this.redisService.set(cacheKey, avaliableTimes, this.CACHE_TTL);
    return avaliableTimes.map(
      (time) => new LessonTimesResponse(time.start, time.end),
    );
  }

  async addLesson(request: AddLessonRequest) {
    const newLesson = request.toEntity(this.LESSON_MINUTE);
    const coach = await this.coachRepository.findOneByOrFail({
      id: request.coachId,
    });

    let lock: Lock;
    try {
      lock = await this.redisService.acquireLock(`add-lesson`);
      await this.validateAddLesson(newLesson);

      const password = random(this.PASSWORD_LENGTH);
      newLesson.updatePassword(hash(password));
      await this.lessonRepository.save(newLesson);

      const cacheKey = `${this.CACHE_LESSON_TIME_PREFIX}:${coach.id}`;
      await this.redisService.del(cacheKey);

      return new AddLessonResponse(newLesson.customerPhone, password);
    } catch (err) {
      throw err;
    } finally {
      await lock.release();
    }
  }

  async remove(request: RemoveLessonRequest) {
    const lesson = await this.lessonRepository.findOneOrFail({
      where: {
        id: request.lessonId,
      },
      relations: ['lessonTimes'],
    });

    lesson.updateLessonTimes(lesson.lessonTimes);
    await this.validateRemoveLesson(
      lesson,
      request.customerPhone,
      request.password,
    );

    await this.dataSource.transaction(async (manager) => {
      await manager.remove(lesson.lessonTimes);
      await manager.remove(lesson);
    });
  }

  private async validateRemoveLesson(
    lesson: Lesson,
    customerPhone: string,
    password: string,
  ) {
    const recentLessonTime = lesson.recentLessonTime();
    if (DayUtil.isToday(recentLessonTime.getStartDate())) {
      throw new BadRequestException('당일 예약은 삭제할 수 없습니다.');
    }

    lesson.validateCredentials(customerPhone, hash(password));
  }

  private getAllLessonTimes() {
    const now = DayUtil.now();
    const lessonTerm = 30;

    const result: LessonTimePeriod[] = [];
    for (let day = ReservablePeriod.START; day <= ReservablePeriod.END; day++) {
      const start = DayUtil.add(now, day, LessonTime.START_HOUR);
      const end = DayUtil.add(now, day, LessonTime.END_HOUR);

      let currentStart = start;
      let currentEnd = DayUtil.addMinute(start, this.LESSON_MINUTE);

      while (DayUtil.isSameOrBefore(currentEnd, end)) {
        result.push(
          new LessonTimePeriod(currentStart.toDate(), currentEnd.toDate()),
        );
        currentStart = DayUtil.addMinute(currentStart, lessonTerm);
        currentEnd = DayUtil.addMinute(currentStart, this.LESSON_MINUTE);
      }
    }
    return result;
  }

  private async validateAddLesson(lesson: Lesson) {
    lesson.validateLessonTimes();
    await this.validateDuplicateLesson(lesson);
  }

  private async validateDuplicateLesson(lesson: Lesson) {
    const newLessonTimes = this.convertLessonTimeByType(lesson);
    const existLessons = await this.findInProgressLessons(lesson.coachId);
    const lessonTimes = existLessons.flatMap(this.convertLessonTimeByType);

    for (const newLessonTime of newLessonTimes) {
      for (const lessonTime of lessonTimes) {
        if (
          this.isDateRangeOverlap(
            newLessonTime.start,
            newLessonTime.end,
            lessonTime.start,
            lessonTime.end,
          )
        ) {
          throw new ConflictException('이미 예약된 레슨 시간입니다.');
        }
      }
    }
  }

  private findInProgressLessons(coachId: number) {
    return this.lessonRepository.findInProgress(
      coachId,
      DayUtil.addFromNow(ReservablePeriod.START).toDate(),
      DayUtil.addFromNow(ReservablePeriod.END).toDate(),
    );
  }

  private convertLessonTimeByType(lesson: Lesson) {
    return lesson.lessonTimes.map(
      (lessonTime) =>
        new LessonTimePeriod(
          lessonTime.getStartDate(),
          lessonTime.getEndDate(),
        ),
    );
  }

  private isAvailableTime(
    time: LessonTimePeriod,
    lessonTimes: LessonTimePeriod[],
  ) {
    for (const lessonTime of lessonTimes) {
      if (
        this.isDateRangeOverlap(
          time.start,
          time.end,
          lessonTime.start,
          lessonTime.end,
        )
      ) {
        return false;
      }
    }

    return true;
  }

  private isDateRangeOverlap(
    startA: Date,
    endA: Date,
    startB: Date,
    endB: Date,
  ) {
    if (startA < endB && endA > startB) {
      return true;
    }

    return false;
  }
}
