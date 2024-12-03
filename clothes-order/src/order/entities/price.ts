export class Price {
  private static readonly DEFAULT_PRICE = 1_000;
  private static readonly DISCOUNT_RATE = 0.5;

  private value;

  private constructor() {}

  static of(value: number, isDiscount?: boolean) {
    if (value <= 0) {
      throw new Error('금액은 0 보다 커야 합니다.');
    }

    const price = new Price();
    price.value = isDiscount ? value * this.DISCOUNT_RATE : value;
    return price;
  }

  get() {
    return this.value;
  }
}
