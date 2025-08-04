import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Instructor } from './entities/instructor.entity';

@Injectable()
export class InstructorRepository extends Repository<Instructor> {
  constructor(private readonly dataSource: DataSource) {
    super(Instructor, dataSource.createEntityManager());
  }
}
