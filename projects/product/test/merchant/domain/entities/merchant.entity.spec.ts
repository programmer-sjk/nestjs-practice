import { UnauthorizedException } from '@nestjs/common';
import { Merchant } from '../../../../src/merchant/domain/entities/merchant.entity';

describe('Merchant', () => {
  describe('verifyPassword', () => {
    it('비밀번호를 검증할 수 있다.', () => {
      // given
      const merchant = new Merchant();
      merchant.password = 'password';

      // when & then
      expect(() => merchant.verifyPassword('password')).not.toThrow();
    });

    it('비밀번호가 일치하지 않으면 예외를 던진다.', () => {
      // given
      const merchant = new Merchant();

      // when & then
      expect(() => merchant.verifyPassword('wrong_password')).toThrow(
        new UnauthorizedException('invalid password'),
      );
    });
  });
});
