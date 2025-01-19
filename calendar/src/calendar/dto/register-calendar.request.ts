import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { Calendar } from '../entities/calendar.entity';

export class RegisterCalendarRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(16)
  title: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  endDate: Date;

  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  userIds: number[];

  toEntity() {
    return Calendar.of(this.title, this.startDate, this.endDate);
  }
}
