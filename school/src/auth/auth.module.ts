import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { InstructorModule } from '../instructor/instructor.module';
import { StudentModule } from '../student/student.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { InstructorLocalStrategy } from './strategies/instructor.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { StudentStrategy } from './strategies/student.strategy';

@Module({
  imports: [
    StudentModule,
    InstructorModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    AuthService,
    StudentStrategy,
    JwtStrategy,
    InstructorLocalStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
