import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import camelcaseKeys from 'camelcase-keys';

@Injectable()
export class SnakeToCamelPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata): unknown {
    if (
      (metadata.type === 'body' || metadata.type === 'query') &&
      value &&
      typeof value === 'object'
    ) {
      return camelcaseKeys(value as Record<string, unknown>, { deep: true });
    }
    return value;
  }
}
