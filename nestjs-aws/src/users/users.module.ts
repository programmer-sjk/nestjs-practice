import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserController } from './users.controller';
import { UserService } from './users.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UsersModule {}
