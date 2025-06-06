import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from '../admin/admin.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, AdminModule, JwtModule, ConfigModule.forRoot()],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
