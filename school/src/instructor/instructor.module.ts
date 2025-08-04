import { Module } from '@nestjs/common';
import { InstructorController } from './instructor.controller';
import { InstructorRepository } from './instructor.repository';
import { InstructorService } from './instructor.service';

@Module({
  providers: [InstructorService, InstructorRepository],
  controllers: [InstructorController],
})
export class InstructorModule {}
