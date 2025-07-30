import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResponseEntity } from '../common/response-entity';
import { SignUpRequest } from './dtos/sign-up.request';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/need-auth-api')
  protectedApi() {
    return 'jwt auth success';
  }

  @Post()
  async signUp(@Body() request: SignUpRequest) {
    await this.userService.signUp(request);
    return ResponseEntity.OK();
  }
}
