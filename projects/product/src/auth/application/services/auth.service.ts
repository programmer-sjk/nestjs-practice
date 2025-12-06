import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MerchantService } from '../../../merchant/application/services/merchant.service';
import { Role } from '../../domain/enums/role.enum';
import { JwtPayload } from '../../infrastructure/interfaces/jwt-payload.interface';
import { MerchantLoginRequest } from '../dto/merchant-login.request';

@Injectable()
export class AuthService {
  private readonly jwtSecret: string;

  constructor(
    private readonly merchantService: MerchantService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.getOrThrow<string>('JWT_SECRET');
  }

  async login(dto: MerchantLoginRequest) {
    const merchant = await this.merchantService.findByEmail(dto.email);
    if (!merchant) {
      throw new UnauthorizedException('Invalid email or password');
    }

    merchant.verifyPassword(dto.password);

    const payload: JwtPayload = {
      userRole: Role.MERCHANT,
      merchantId: merchant.id,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: this.jwtSecret,
        expiresIn: '7d',
      }),
    };
  }
}
