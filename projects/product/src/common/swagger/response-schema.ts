import { Type } from '@nestjs/common';
import { ApiResponseOptions, getSchemaPath } from '@nestjs/swagger';
import { ResponseEntity } from '../response-entity';

export function createResponseSchema<T>(dataType: Type<T> | 'string') {
  const dataSchema =
    dataType === 'string'
      ? { type: 'string' }
      : {
          $ref: getSchemaPath(dataType),
        };

  return {
    allOf: [
      {
        $ref: getSchemaPath(ResponseEntity),
      },
      {
        properties: {
          data: dataSchema,
        },
      },
    ],
  };
}

export const MutationResponseSchema: ApiResponseOptions = {
  status: 200,
  description: '주문 영수증 조회 성공',
  schema: {
    allOf: [
      {
        $ref: getSchemaPath(ResponseEntity),
      },
    ],
  },
};
