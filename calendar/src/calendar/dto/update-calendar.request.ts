import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { CalendarUser } from '../entities/calendar-user.entity';
import { AlarmType } from '../enums/alarm-type.enum';

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
  @IsEnum(AlarmType)
  alarmType: AlarmType;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(5)
  @Max(60)
  ringMinuteBefore: number;

  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  userIds: number[];

  toCalendarUserEntity(calendarId: number) {
    return this.userIds.map((userId) => CalendarUser.of(calendarId, userId));
  }
}
