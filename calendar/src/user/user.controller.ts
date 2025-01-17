import { Body, Controller, Post } from '@nestjs/common';
import { AddUserRequest } from './dto/add-user.request';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() request: AddUserRequest) {
    await this.userService.addUser(request);
  }
}
