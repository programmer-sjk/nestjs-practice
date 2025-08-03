import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from '../ormconfig';
import { AuthModule } from './auth/auth.module';
import { CourseModule } from './course/course.module';
import { UserModule } from './user/user.module';
import { InstructorModule } from './instructor/instructor.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionOptions),
    AuthModule,
    UserModule,
    CourseModule,
    InstructorModule,
  ],
})
export class AppModule {}
