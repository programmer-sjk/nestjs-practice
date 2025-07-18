import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findOne(id: number) {
    return {
      id,
      email: 'universe@example.com',
      password: 'password',
    };
  }
}
