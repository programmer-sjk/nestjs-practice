export class Price {
  private value;

  private constructor() {}

  static of(value: number, isDiscount: boolean) {
    if (value <= 0) {
      throw new Error('가격은 0 보다 커야 합니다.');
    }

    const price = new Price();
    price.value = isDiscount ? value / 2 : value;
    return price;
  }

  get() {
    return this.value;
  }
}
