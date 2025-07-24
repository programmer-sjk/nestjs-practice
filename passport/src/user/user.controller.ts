import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SignUpRequest } from './dtos/sign-up.request';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/need-auth-api')
  protectedApi() {
    return 'jwt auth success';
  }

  @Post()
  signUp(@Body() request: SignUpRequest) {
    return this.userService.signUp(request);
  }
}
