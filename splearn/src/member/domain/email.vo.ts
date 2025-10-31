export class Email {
  private readonly value: string;

  constructor(value: string) {
    if (!value) {
      throw new Error('Email is required');
    }

    if (!value.includes('@')) {
      throw new Error('Email is invalid');
    }

    this.value = value;
  }
}
