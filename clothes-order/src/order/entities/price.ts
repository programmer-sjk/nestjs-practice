export class Price {
  private static readonly DEFAULT_PRICE = 1_000;
  private static readonly DISCOUNT_RATE = 0.5;

  private value;

  private constructor() {}

  static of(count: number, isDiscount: boolean) {
    if (count <= 0) {
      throw new Error('수량은 0 보다 커야 합니다.');
    }

    const price = new Price();
    const totalPrice = count * this.DEFAULT_PRICE;
    price.value = isDiscount ? totalPrice * this.DISCOUNT_RATE : totalPrice;
    return price;
  }

  get() {
    return this.value;
  }
}
