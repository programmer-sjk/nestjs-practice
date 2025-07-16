import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
  @UseInterceptors(FileInterceptor('file'))
  async registerProfile(@UploadedFile() file: Express.Multer.File) {
    const result = await this.usersService.uploadProfile(file);
    return ResponseEntity.OK(result);
  }
}
