import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class InstructorLocalStrategy extends PassportStrategy(
  Strategy,
  'instructor',
) {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const instructor = await this.authService.validateInstructor(
      email,
      password,
    );

    if (!instructor) {
      throw new UnauthorizedException();
    }

    const payload = { name: instructor.name, sub: instructor.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
