import { Body, Controller, Post } from '@nestjs/common';
import { ResponseEntity } from '../common/response-entity';
import { SignUpRequest } from './dto/sign-up.request';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  async signUp(@Body() body: SignUpRequest) {
    await this.usersService.signUp(body);
    return ResponseEntity.OK();
  }

  @Post('profile')
  async registerProfile() {
    await this.usersService.uploadProfile();
    return ResponseEntity.OK();
  }
}
