import { Role } from '../../domain/enums/role.enum';

export interface JwtPayload {
  userRole: Role;
  merchantId?: number;
  customerId?: number;
}
