import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CoachRepository } from '../coach/coach.repository';
import { DateUtil } from '../common/date-util';
import { LessonScheduleRequest } from './dto/lesson-schedule.request';
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
  ) {}

  async findLessonSchedules(dto: LessonScheduleRequest) {
    const coach = await this.coachRepository.findOneBy({ id: dto.coachId });
    if (!coach) {
      throw new BadRequestException('등록되지 않은 코치입니다.');
    }

    const existLessons = await this.lessonRepository.findBy({
      coachId: coach.id,
    });

    return this.filterExistLesson(this.allSchedulesDuringWeek(), existLessons);
  }

  async addLesson(dto: RegisterRequest) {
    const lesson = dto.toEntity();
    await this.validateNewLesson(lesson);
    return this.lessonRepository.save(lesson);
  }

  private async validateNewLesson(lesson: Lesson) {
    const coach = await this.coachRepository.findOneBy({ id: lesson.coachId });
    if (!coach) {
      throw new BadRequestException('등록되지 않은 코치입니다.');
    }

    if (lesson.isInvalidLessonHour()) {
      throw new BadRequestException('예약할 수 없는 시간입니다.');
    }

    if (lesson.isInvalidLessonDate()) {
      throw new BadRequestException('예약은 내일부터 일주일간 가능합니다.');
    }

    const lessons = await this.lessonRepository.findBy({
      coachId: coach.id,
      dayOfWeek: lesson.dayOfWeek,
    });

    if (lessons.find((lesson) => lesson.isDuplicate(lessons))) {
      throw new BadRequestException('이미 예약된 레슨 시간입니다.');
    }
  }

  async removeLesson(id: number) {
    const lesson = await this.lessonRepository.findOneBy({ id });
    if (!lesson) {
      throw new NotFoundException('등록되지 않은 레슨입니다.');
    }

    await this.lessonRepository.remove(lesson);
  }

  private allSchedulesDuringWeek() {
    const allSchedules: Record<string, number[]> = {};
    const tomorrowOffest = 1;
    for (let i = tomorrowOffest; i <= 7; i++) {
      const weekday = DateUtil.weekday(i);
      allSchedules[this.toDayOfWeek(weekday)] = this.lessonStartHours;
    }

    return allSchedules;
  }

  private filterExistLesson(
    allSchedules: Record<DayOfWeek, number[]>,
    lessons: Lesson[],
  ) {
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
