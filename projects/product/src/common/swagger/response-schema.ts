import { Type } from '@nestjs/common';
import { ApiResponseOptions, getSchemaPath } from '@nestjs/swagger';
import { ResponseEntity } from '../response-entity';

export function createResponseSchema<T>(
  dataType: 'string' | Type<T> | Type<T>[],
) {
  let dataSchema: Record<string, any>;

  if (dataType === 'string') {
    dataSchema = { type: 'string' };
  } else if (Array.isArray(dataType)) {
    dataSchema = {
      type: 'array',
      items: { $ref: getSchemaPath(dataType[0]) },
    };
  } else {
    dataSchema = {
      $ref: getSchemaPath(dataType),
    };
  }

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
      success: { type: 'boolean', example: true },
      message: {
        type: 'string',
        example: '성공시 빈 문자열, 실패했을때 에러 메시지',
      },
      data: { type: 'string', example: '' },
    },
  },
};
