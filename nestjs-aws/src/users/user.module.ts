import { Module } from '@nestjs/common';
import { UserProfileRepository } from './repositories/user-profile.repository';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, UserProfileRepository],
})
export class UsersModule {}
