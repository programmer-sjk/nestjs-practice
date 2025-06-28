import { Body, Controller, Post } from '@nestjs/common';
import { SignUpRequest } from './dto/sign-up.request';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  async signUp(@Body() body: SignUpRequest) {
    return this.usersService.signUp(body);
  }
}
