import bcrypt from 'bcrypt';

export const hash = (value: string) => {
  const saltRound = 10;
  return bcrypt.hashAsync(value, saltRound);
};

export const compare = (plain: string, hashed: string) => {
  return bcrypt.compareAsync(plain, hashed);
};
