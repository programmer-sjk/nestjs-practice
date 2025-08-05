import { Injectable } from '@nestjs/common';
import { SignUpRequest } from './dtos/sign-up.request';
import { StudentRepository } from './student.repository';
@Injectable()
export class StudentService {
  constructor(private readonly studentRepository: StudentRepository) {}

  async findOneByEmail(email: string) {
    return this.studentRepository.findOneBy({ email });
  }

  signUp(dto: SignUpRequest) {
    return this.studentRepository.save(dto.toEntity());
  }
}
