import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { CalendarUser } from '../entities/calendar-user.entity';

export class UpdateCalendarRequest {
  @IsNotEmpty()
  @IsInt()
  id: number;

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

  toCalendarUserEntity(calendarId: number) {
    return this.userIds.map((userId) => CalendarUser.of(calendarId, userId));
  }
}
