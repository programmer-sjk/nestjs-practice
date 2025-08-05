import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from '../ormconfig';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { InstructorModule } from './instructor/instructor.module';
import { StudentModule } from './user/student.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionOptions),
    AuthModule,
    StudentModule,
    CourseModule,
    InstructorModule,
  ],
})
export class AppModule {}
