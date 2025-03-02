import { Body, Controller, Post } from '@nestjs/common';
import { ResponseEntity } from '../common/response-entity';
import { SignUpRequest } from './dto/sign-up.request';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async signUp(
    @Body() request: SignUpRequest,
  ): Promise<ResponseEntity<string>> {
    try {
      await this.userService.addUser(request);
      return ResponseEntity.OK();
    } catch (err) {
      return ResponseEntity.ERROR(err.message);
    }
  }
}
