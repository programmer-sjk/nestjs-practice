import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InstructorService } from '../instructor/instructor.service';
import { Student } from '../student/entities/student.entity';
import { StudentService } from '../student/student.service';

@Injectable()
export class AuthService {
  constructor(
    private studentService: StudentService,
    private instructorService: InstructorService,
    private jwtService: JwtService,
  ) {}

  async validateStudent(email: string, password: string) {
    const student = await this.studentService.findOneByEmail(email);
    if (student && student.password === password) {
      return student;
    }
  }

  async validateInstructor(email: string, password: string) {
    const instructor = await this.instructorService.findOneByEmail(email);
    if (instructor && instructor.password === password) {
      return instructor;
    }
  }

  login(student: Student) {
    const payload = { name: student.name, sub: student.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
