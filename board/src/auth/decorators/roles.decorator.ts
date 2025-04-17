import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'roles';
export const Roles = (Role) => SetMetadata(ROLE_KEY, Role);
