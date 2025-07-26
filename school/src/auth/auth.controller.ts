import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountAuthGuard } from './guards/account-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AccountAuthGuard)
  @Post('/login')
  login(@Request() req) {
    return req.user;
  }

  @UseGuards(AccountAuthGuard)
  @Post('/jwt-login')
  jwtLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/do-something')
  doSomething(@Request() req) {
    return req.user;
  }
}
