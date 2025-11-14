import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SignUpRequest } from './dto/sign-up.request';
import { UpdatePasswordRequest } from './dto/update-password.request';
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
  async updatePassword(
    @Param('id') id: number,
    @Body() request: UpdatePasswordRequest,
  ) {
    await this.userService.updatePassword(id, request.password);
  }

  @Delete('/:id')
  async withdraw(@Param('id') id: number) {
    await this.userService.remove(id);
  }
}
