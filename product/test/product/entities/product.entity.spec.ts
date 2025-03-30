import { BadRequestException } from '@nestjs/common';
import { Product } from '../../../src/product/entities/product.entity';

describe('Product', () => {
  describe('decreaseStock', () => {
    it('상품의 재고를 감소한다.', () => {
      // given
      const product = new Product();
      product.stock = 10;

      // when
      product.decreaseStock();

      // then
      expect(product.stock).toBe(9);
    });

    it('상품의 재고가 없는데 감소하면 예외가 발생한다.', () => {
      // given
      const product = new Product();
      product.stock = 0;

      // when & then
      expect(() => product.decreaseStock()).toThrowError(
        new BadRequestException('재고가 없습니다.'),
      );
    });
  });
});
