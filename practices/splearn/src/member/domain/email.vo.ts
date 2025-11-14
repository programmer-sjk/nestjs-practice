export class Email {
  private readonly _value: string;

  constructor(value: string) {
    if (!value) {
      throw new Error('Email is required');
    }

    if (!value.includes('@')) {
      throw new Error('Email is invalid');
    }

    this._value = value;
  }

  get value(): string {
    return this._value;
  }
}
