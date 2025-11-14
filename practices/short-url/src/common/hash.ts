import * as crypto from 'crypto';

export const hash = (value: string) => {
  return crypto.createHash('sha1').update(value).digest('hex');
};
