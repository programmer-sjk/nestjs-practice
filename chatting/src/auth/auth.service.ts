import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from '../common/bcrypt';
import { UserService } from '../user/user.service';
import { SignInRequest } from './dto/sign-in.request';
import { SignInResponse } from './dto/sign-in.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(dto: SignInRequest) {
    const user = await this.userService.findOneByEmail(dto.email);
    if (!user) {
      throw new BadRequestException('사용자가 존재하지 않습니다.');
    }

    if (!compare(dto.password, user.password)) {
      throw new BadRequestException('계정 정보가 일치하지 않습니다.');
    }

    const payload = { sub: user.id };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: 'secret',
      expiresIn: '1d',
    });
    return new SignInResponse(accessToken);
  }
}
