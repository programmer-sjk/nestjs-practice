import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CoachRepository } from '../coach/coach.repository';
import { DateUtil } from '../common/date-util';
import { RedisService } from '../redis/redis.service';
import { LessonScheduleRequest } from './dto/lesson-schedule.request';
import { LessonScheduleResponse } from './dto/lesson-schedule.response';
import { RegisterRequest } from './dto/register.request';
import { Lesson } from './entities/lesson.entity';
import { DayOfWeek } from './enums/day-of-week.enum';
import { LessonRepository } from './lesson.repository';

@Injectable()
export class LessonService {
  private readonly lessonStartHours = [
    7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  ];

  constructor(
    private readonly coachRepository: CoachRepository,
    private readonly lessonRepository: LessonRepository,
    private readonly redisService: RedisService,
  ) {}

  async findLessonSchedules(dto: LessonScheduleRequest) {
    const coach = await this.findCoachByIdOrThrow(dto.coachId);
    const existLessons = await this.lessonRepository.findSchedules(coach.id);
    return new LessonScheduleResponse(this.filterExistLesson(existLessons));
  }

  async addLesson(dto: RegisterRequest) {
    const lesson = dto.toEntity();

    let lock;
    try {
      lock = await this.redisService.acquireLock('add-lesson');
      await this.validateNewLesson(lesson);
      await this.lessonRepository.save(lesson);
    } catch (e) {
      throw e;
    } finally {
      await lock?.release();
    }
  }

  private async validateNewLesson(lesson: Lesson) {
    const coach = await this.findCoachByIdOrThrow(lesson.coachId);
    if (lesson.isInvalidLessonHour()) {
      throw new BadRequestException('예약할 수 없는 시간입니다.');
    }

    if (lesson.isInvalidLessonDate()) {
      throw new BadRequestException('예약은 내일부터 일주일간 가능합니다.');
    }

    const lessons = await this.lessonRepository.findSchedules(
      coach.id,
      lesson.dayOfWeek,
    );

    if (lesson.isDuplicate(lessons)) {
      throw new BadRequestException('이미 예약된 레슨 시간입니다.');
    }
  }

  async removeLesson(id: number) {
    const lesson = await this.lessonRepository.findOneBy({ id });
    this.validateRemoveLesson(lesson);
    await this.lessonRepository.remove(lesson);
  }

  private validateRemoveLesson(lesson: Lesson) {
    if (!lesson) {
      throw new NotFoundException('등록되지 않은 레슨입니다.');
    }

    if (lesson.isRegular()) {
      if (this.toDayOfWeek(DateUtil.now().weekday) === lesson.dayOfWeek) {
        throw new BadRequestException('당일 예약은 취소할 수 없습니다.');
      }
    }

    if (lesson.isOneTime()) {
      if (DateUtil.isToday(lesson.startDate)) {
        throw new BadRequestException('당일 예약은 취소할 수 없습니다.');
      }
    }
  }

  private async findCoachByIdOrThrow(coachId: number) {
    const coach = await this.coachRepository.findOneBy({ id: coachId });
    if (!coach) {
      throw new BadRequestException('등록되지 않은 코치입니다.');
    }

    return coach;
  }

  private allSchedulesDuringWeek() {
    const allSchedules: Record<string, number[]> = {};
    const tomorrowOffset = 1;
    const lastLessonOffsetFromToday = 7;

    for (let i = tomorrowOffset; i <= lastLessonOffsetFromToday; i++) {
      const weekday = DateUtil.weekday(i);
      allSchedules[this.toDayOfWeek(weekday)] = this.lessonStartHours;
    }

    return allSchedules;
  }

  private filterExistLesson(lessons: Lesson[]) {
    const allSchedules = this.allSchedulesDuringWeek();
    lessons.map((lesson) => {
      allSchedules[lesson.dayOfWeek] = allSchedules[lesson.dayOfWeek].filter(
        (hour) => hour !== lesson.getHour(),
      );
    });

    return allSchedules;
  }

  private toDayOfWeek(weekday: number) {
    switch (weekday) {
      case 1:
        return DayOfWeek.MONDAY;
      case 2:
        return DayOfWeek.TUESDAY;
      case 3:
        return DayOfWeek.WEDNESDAY;
      case 4:
        return DayOfWeek.THURSDAY;
      case 5:
        return DayOfWeek.FRIDAY;
      case 6:
        return DayOfWeek.SATURDAY;
      case 7:
        return DayOfWeek.SUNDAY;
    }
  }
}
