import { Injectable } from '@nestjs/common';
import { MerchantLoginRequest } from '../dto/merchant-login.request';

@Injectable()
export class AuthService {
  async login(dto: MerchantLoginRequest) {}
}
