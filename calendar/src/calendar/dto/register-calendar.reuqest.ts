import { IsDate, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Calendar } from './../entities/calendar.entity';

export class RegisterCalendarRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(16)
  title: string;

  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  toEntity() {
    return Calendar.of(this.title, this.startDate, this.endDate);
  }
}
