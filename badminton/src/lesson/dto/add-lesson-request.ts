import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { LessonType } from '../enums/lesson-type.enum';
import { Lesson } from './../entities/lesson.entity';
import { LessonTimeDto } from './lesson-time-dto';

export class AddLessonRequest {
  @IsNotEmpty()
  @IsEnum(LessonType)
  type: LessonType;

  @IsNotEmpty()
  @Transform(({ value }) => +value)
  @IsInt()
  coachId: number;

  @IsNotEmpty()
  @MaxLength(18)
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @MaxLength(11)
  @IsPhoneNumber('KR')
  customerPhone: string;

  @IsNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @Type(() => LessonTimeDto)
  lessonTimes: LessonTimeDto[];

  toEntity() {
    const lesson = Lesson.of(
      this.type,
      this.coachId,
      this.customerName,
      this.customerPhone,
    );

    const lessonTimes = this.lessonTimes.map((dto) => dto.toEntity(lesson));
    lesson.updateLessonTimes(lessonTimes);
    return lesson;
  }
}
