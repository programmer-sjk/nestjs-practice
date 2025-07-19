import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AccountAuthGuard } from './guards/account-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(AccountAuthGuard)
  @Post('/login')
  login(@Request() req) {
    return req.user;
  }
}
