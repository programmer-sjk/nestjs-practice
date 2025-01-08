import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AddUserRequest } from './dto/add-user-request';
import { UpdateNameRequest } from './dto/update-name-request';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findUser(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  async addUser(@Body() request: AddUserRequest) {
    return this.userService.add(request);
  }

  @Put()
  async updateUserName(@Body() request: UpdateNameRequest) {
    return this.userService.updateName(request.id, request.name);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
