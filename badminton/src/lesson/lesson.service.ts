import { BadRequestException, Injectable } from '@nestjs/common';
import { CoachRepository } from '../coach/coach.repository';
import { RegisterRequest } from './dto/register.request';
import { Lesson } from './entities/lesson.entity';
import { LessonRepository } from './lesson.repository';

@Injectable()
export class LessonService {
  constructor(
    private readonly coachRepository: CoachRepository,
    private readonly lessonRepository: LessonRepository,
  ) {}

  async addLesson(dto: RegisterRequest) {
    const lesson = dto.toEntity();
    await this.validate(lesson);
    return this.lessonRepository.save(lesson);
  }

  private async validate(lesson: Lesson) {
    const coach = await this.coachRepository.findOneBy({ id: lesson.coachId });
    if (!coach) {
      throw new BadRequestException('등록되지 않은 코치입니다.');
    }

    if (lesson.isInvalidLessonHour()) {
      throw new BadRequestException('예약할 수 없는 시간입니다.');
    }
  }
}
