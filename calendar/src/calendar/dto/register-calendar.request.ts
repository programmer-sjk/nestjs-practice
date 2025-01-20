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
import { Calendar } from '../entities/calendar.entity';
import { AlarmType } from '../enums/alarm-type.enum';
import { CalendarAlarm } from './../entities/calendar-alarm.entity';

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

  toEntity() {
    return Calendar.of(this.title, this.startDate, this.endDate);
  }

  toCalendarUserEntity(calendarId: number) {
    return this.userIds.map((userId) => CalendarUser.of(calendarId, userId));
  }

  toAlarmEntity(calendarId: number) {
    return CalendarAlarm.of(calendarId, this.alarmType, this.ringMinuteBefore);
  }
}
