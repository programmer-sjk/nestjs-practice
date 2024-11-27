import * as crypto from 'crypto';

export const random = (length: number) => {
  return crypto.randomBytes(32).toString('hex').slice(0, length);
};

export const hash = (value: string) => {
  return crypto.createHash('sha1').update(value).digest('hex');
};
