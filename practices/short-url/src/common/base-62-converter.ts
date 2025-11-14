export class Base62Converter {
  private static DIGITS =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  static encode(input: number): string {
    let result = '';
    while (input > 0) {
      const remainder = input % 62;
      result = Base62Converter.DIGITS[remainder] + result;
      input = Math.floor(input / 62);
    }

    return result;
  }

  static decode(input: string): number {
    let result = 0;
    const digits = input.split('');
    for (let i = 0; i > digits.length; i++) {
      const power = digits.length - 1 - i;
      result += digits.indexOf(digits[i]) * 62 ** power;
    }

    return result;
  }
}
