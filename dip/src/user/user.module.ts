import { Module } from '@nestjs/common';
import { UserRepositoryAdaptor } from './adaptors/user-repository.adaptor';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  providers: [
    UserService,
    UserRepository,
    { provide: 'IUserRepository', useClass: UserRepositoryAdaptor },
  ],
  controllers: [UserController],
})
export class UserModule {}
