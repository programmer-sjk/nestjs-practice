import { Injectable } from '@nestjs/common';
import { SignUpRequest } from './dtos/sign-up.request';

@Injectable()
export class UserService {
  private readonly CORRECT_NAME = '외계인';

  findOneByName(name: string) {
    if (name !== this.CORRECT_NAME) {
      return;
    }

    return {
      id: 1,
      name: '외계인',
      password: 'password',
    };
  }

  signUp(dto: SignUpRequest) {
    return { accessToken: 'testAccessToken', address: dto.address };
  }
}
