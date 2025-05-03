import { Body, Controller, Get, Post } from '@nestjs/common';
import { ResponseEntity } from '../common/response-entity';
import { SignUpRequest } from './dto/sign-up.request';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return ResponseEntity.OK(users)
  }

  @Post()
  async signUp(@Body() request: SignUpRequest) {
    await this.userService.signUp(request);
    return ResponseEntity.OK();
  }
}
