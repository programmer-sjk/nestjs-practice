import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsPhoneNumber, IsString, MaxLength } from 'class-validator';

export class RemoveLessonRequest {
  @IsNotEmpty()
  @Transform(({ value }) => +value)
  @IsInt()
  lessonId: number;

  @IsNotEmpty()
  @MaxLength(11)
  @IsPhoneNumber('KR')
  customerPhone: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
