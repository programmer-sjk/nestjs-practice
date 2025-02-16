import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

export const ROLE_KEY = 'roles';
export const Roles = () => SetMetadata(ROLE_KEY, [Role.ADMIN, Role.USER]);
