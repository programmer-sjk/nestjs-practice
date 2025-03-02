import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ResponseEntity } from './../common/response-entity';
import { AuthService } from './auth.service';
import { SignInRequest } from './dto/sign-in.request';
import { SignInResponse } from './dto/sign-in.response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() request: SignInRequest,
  ): Promise<ResponseEntity<SignInResponse | string>> {
    try {
      const acceesToken = await this.authService.signIn(request);
      return ResponseEntity.OK(acceesToken);
    } catch (err) {
      return ResponseEntity.ERROR(err);
    }
  }

  @Post('/admin/login')
  @HttpCode(HttpStatus.OK)
  async adminSignIn(
    @Body() request: SignInRequest,
  ): Promise<ResponseEntity<SignInResponse | string>> {
    try {
      const acceesToken = await this.authService.adminSignIn(request);
      return ResponseEntity.OK(acceesToken);
    } catch (err) {
      return ResponseEntity.ERROR(err);
    }
  }
}
