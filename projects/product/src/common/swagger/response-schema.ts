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
  description: '쓰기 작업 성공',
  schema: {
    properties: {
      success: { type: 'boolean', example: false },
      message: { type: 'string', example: '실패한 이유에 대한 메시지' },
      data: { type: 'string', example: '' },
    },
  },
};
