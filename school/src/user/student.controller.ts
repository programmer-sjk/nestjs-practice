import { Body, Controller, Post } from '@nestjs/common';
import { ResponseEntity } from '../common/response-entity';
import { SignUpRequest } from './dtos/sign-up.request';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async signUp(@Body() request: SignUpRequest) {
    await this.studentService.signUp(request);
    return ResponseEntity.OK();
  }
}
