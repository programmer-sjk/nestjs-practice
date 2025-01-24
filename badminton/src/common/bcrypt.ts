import bcrypt from 'bcrypt';

export const hash = async (value: string) => {
  const saltRound = 10;
  return bcrypt.hash(value, saltRound);
};
