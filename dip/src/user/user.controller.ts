import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  async find() {}

  @Post()
  async signUp() {}

  @Patch()
  async updatePassword() {}

  @Delete()
  async withdraw() {}
}
