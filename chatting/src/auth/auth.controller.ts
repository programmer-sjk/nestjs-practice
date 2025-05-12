import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ResponseEntity } from '../common/response-entity';
import { AuthService } from './auth.service';
import { SignInRequest } from './dto/sign-in.request';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() request: SignInRequest) {
    const token = await this.authService.signIn(request);
    return ResponseEntity.OK(token)
  }
}
