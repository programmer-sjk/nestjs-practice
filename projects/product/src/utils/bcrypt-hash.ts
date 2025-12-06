import * as bcrypt from 'bcrypt';

export async function bcryptHash(value: string) {
  const saltOrRounds = 10;
  return await bcrypt.hash(value, saltOrRounds);
}
