import { ApiResponseOptions } from '@nestjs/swagger';
import { createResponseSchema } from '../../common/swagger/response-schema';
import { ProductResponse } from '../application/dto/product.response';

export const ProductSuccessResponse: ApiResponseOptions = {
  status: 200,
  description: '상품 상세 조회 성공',
  schema: createResponseSchema(ProductResponse),
};

export const ProductListSuccessResponse: ApiResponseOptions = {
  status: 200,
  description: '상품 목록 조회 성공',
  schema: createResponseSchema([ProductResponse]),
};
