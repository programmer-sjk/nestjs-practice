export interface PasswordEncoder {
  encode(password: string): string;
  verify(password: string, hash: string): boolean;
}
