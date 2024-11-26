import { Injectable } from '@nestjs/common';
import { LessonTimesRequest } from './dto/lesson-times-request';
import { LessonRepository } from './lesson-repository';

@Injectable()
export class LessonService {
  constructor(private readonly lessonRepository: LessonRepository) {}

  async findAvilableLessons(dto: LessonTimesRequest) {
    console.log(dto);
  }
}
