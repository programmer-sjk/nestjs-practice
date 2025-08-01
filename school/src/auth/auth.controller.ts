import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ResponseEntity } from '../common/response-entity';
import { AuthService } from './auth.service';
import { AccountAuthGuard } from './guards/account-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AccountAuthGuard)
  @Post('/login')
  login(@Request() req) {
    return ResponseEntity.OK({ accessToken: req.user.accessToken as string });
  }
}
