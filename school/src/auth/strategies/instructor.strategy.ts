import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class InstructorLocalStrategy extends PassportStrategy(
  Strategy,
  'instructor',
) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const instructor = await this.authService.validateInstructor(
      email,
      password,
    );

    if (!instructor) {
      throw new UnauthorizedException();
    }
    return instructor;
  }
}
