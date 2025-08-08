import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ResponseEntity } from '../common/response-entity';
import { AuthService } from './auth.service';
import { StudentAuthGuard } from './guards/student-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(StudentAuthGuard)
  @Post('/login')
  login(@Request() req) {
    return ResponseEntity.OK({ accessToken: req.user.accessToken as string });
  }

  @UseGuards(StudentAuthGuard)
  @Post('/instructor/login')
  instructorLogin(@Request() req) {
    return ResponseEntity.OK({ accessToken: req.user.accessToken as string });
  }
}
