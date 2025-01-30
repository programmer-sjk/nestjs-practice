import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CoachRepository } from '../coach/coach.repository';
import { LessonScheduleRequest } from './dto/lesson-schedule.request';
import { RegisterRequest } from './dto/register.request';
import { Lesson } from './entities/lesson.entity';
import { LessonRepository } from './lesson.repository';

@Injectable()
export class LessonService {
  constructor(
    private readonly coachRepository: CoachRepository,
    private readonly lessonRepository: LessonRepository,
  ) {}

  async findLessonSchedules(dto: LessonScheduleRequest) {
    const coach = await this.coachRepository.findOneBy({ id: dto.coachId });
    if (!coach) {
      throw new BadRequestException('등록되지 않은 코치입니다.');
    }

    const existLessons = await this.lessonRepository.findBy({ coachId: coach.id });
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

    const duplicateLesson = await this.lessonRepository.findOneBy({
      coachId: coach.id,
      dayOfWeek: lesson.dayOfWeek,
      startHour: lesson.startHour,
    });

    if (duplicateLesson) {
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
    
  }
}
