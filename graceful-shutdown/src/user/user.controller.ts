import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/long-query')
  async longQuery() {
    await this.userService.doLongQuery();
  }

  @Get('/long-query2')
  async longQuery2() {
    await this.userService.doLongQuery2();
  }
}
