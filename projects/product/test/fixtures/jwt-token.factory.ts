import * as jwt from 'jsonwebtoken';
import { Role } from '../../src/auth/domain/enums/role.enum';

export class JwtTokenFactory {
  static create(merchantId: number): string {
    return jwt.sign(
      { userRole: Role.MERCHANT, merchantId },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1m',
      },
    );
  }
}
