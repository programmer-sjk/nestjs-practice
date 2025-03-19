import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  async find(@Param('id') id: number) {
    return this.userService.find(id);
  }

  @Post()
  async signUp() {}

  @Patch()
  async updatePassword() {}

  @Delete()
  async withdraw() {}
}
