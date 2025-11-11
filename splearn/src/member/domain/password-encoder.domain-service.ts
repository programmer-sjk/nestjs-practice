import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { PasswordEncoder } from '../interfaces/password-encoder.interface';

@Injectable()
export class PasswordEncoderDomainService implements PasswordEncoder {
  encode(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  verify(password: string, hash: string): boolean {
    return crypto.createHash('sha256').update(password).digest('hex') === hash;
  }
}
