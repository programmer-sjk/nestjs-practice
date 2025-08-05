import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Student } from '../user/entities/student.entity';
import { StudentService } from '../user/student.service';

@Injectable()
export class AuthService {
  constructor(
    private studentService: StudentService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const student = await this.studentService.findOneByEmail(email);
    if (student && student.password === password) {
      return student;
    }
  }

  login(student: Student) {
    const payload = { name: student.name, sub: student.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
