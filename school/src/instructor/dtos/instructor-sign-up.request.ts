import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Instructor } from '../entities/instructor.entity';

export class InstructorSignUpRequest {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  toEntity() {
    return Instructor.of(this.name, this.email, this.password);
  }
}
