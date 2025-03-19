import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SignUpRequest } from './dto/sign-up.request';
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
  async signUp(@Body() request: SignUpRequest) {
    await this.userService.signUp(request);
  }

  @Patch('/:id')
  async updatePassword() {}

  @Delete()
  async withdraw() {}
}
