import { SignInRequest } from '../../../src/auth/dto/sign-in.request';

export class SignInRequestFactory {
  private constructor() {}

  static of(email: string, password: string) {
    const dto = new SignInRequest();
    dto.email = email;
    dto.password = password;
    return dto;
  }
}
