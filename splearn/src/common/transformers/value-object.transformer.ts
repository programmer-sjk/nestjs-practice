import { ValueTransformer } from 'typeorm';

interface ValueObject {
  value: string;
}

export function valueObjectTransformer<T extends ValueObject>(
  ValueObjectClass: new (value: string) => T,
): ValueTransformer {
  return {
    to: (valueObject?: T | null) => valueObject?.value ?? null,
    from: (dbValue: string) => (dbValue ? new ValueObjectClass(dbValue) : null),
  };
}
