import { Injectable } from '@nestjs/common';
import { InstructorSignUpRequest } from './dtos/instructor-sign-up.request';
import { InstructorRepository } from './instructor.repository';

@Injectable()
export class InstructorService {
  constructor(private readonly instructorRepository: InstructorRepository) {}

  async findOneByEmail(email: string) {
    return this.instructorRepository.findOneBy({ email });
  }

  async signUp(dto: InstructorSignUpRequest) {
    return this.instructorRepository.save(dto.toEntity());
  }
}
