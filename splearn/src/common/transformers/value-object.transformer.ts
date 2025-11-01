import { ValueTransformer } from 'typeorm';

/**
 * Value Object용 Transformer 생성 함수
 * Value Object는 반드시 'value' getter를 가지고 있어야 합니다.
 */
export function valueObjectTransformer<T>(
  ValueObjectClass: new (value: string) => T,
): ValueTransformer {
  return {
    to: (valueObject: any) => valueObject?.value ?? null,
    from: (dbValue: string) => (dbValue ? new ValueObjectClass(dbValue) : null),
  };
}
