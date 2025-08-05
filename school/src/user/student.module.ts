import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentRepository } from './student.repository';
import { StudentService } from './student.service';

@Module({
  providers: [StudentService, StudentRepository],
  exports: [StudentService],
  controllers: [StudentController],
})
export class StudentModule {}
