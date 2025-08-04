import { Body, Controller, Post } from '@nestjs/common';
import { InstructorSignUpRequest } from './dtos/instructor-sign-up.request';
import { InstructorService } from './instructor.service';

@Controller('instructor')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @Post()
  async signUp(@Body() body: InstructorSignUpRequest) {
    return this.instructorService.signUp(body);
  }
}
