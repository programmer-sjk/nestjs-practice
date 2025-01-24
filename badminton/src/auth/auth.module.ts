import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, ConfigModule.forRoot({ envFilePath: '.env' })],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
