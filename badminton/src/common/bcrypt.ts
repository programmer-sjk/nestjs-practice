import * as bcrypt from 'bcrypt';

export const hash = (value: string) => {
  const saltRound = 10;
  return bcrypt.hashSync(value, saltRound);
};

export const compare = (plain: string, hashed: string) => {
  return bcrypt.compareSync(plain, hashed);
};
