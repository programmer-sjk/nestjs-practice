import { Body, Controller, Post } from '@nestjs/common';
import { ResponseEntity } from './../common/response-entity';
import { AuthService } from './auth.service';
import { SignInRequest } from './dto/sigin-in.request';
import { SignInResponse } from './dto/sigin-in.response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signIn(
    @Body() request: SignInRequest,
  ): Promise<ResponseEntity<SignInResponse | string>> {
    const result = await this.authService.signIn(request);
    return ResponseEntity.OK(result);
  }
}
