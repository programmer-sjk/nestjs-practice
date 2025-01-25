import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from '../common/bcrypt';
import { UserService } from '../user/user.service';
import { SignInRequest } from './dto/sigin-in.request';
import { SignInResponse } from './dto/sigin-in.response';

@Injectable()
export class AuthService {
  private readonly expireSecond = 5 * 60;
  private readonly secretKey;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    this.secretKey = this.configService.get<string>('SECRET_KEY');
  }

  async signIn(dto: SignInRequest) {
    const user = await this.userService.findUserByEmailOrThrow(dto.email);
    const isAuthentication = compare(dto.password, user.password);
    if (!isAuthentication) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.secretKey,
      expiresIn: this.expireSecond,
    });

    return new SignInResponse(accessToken);
  }
}
