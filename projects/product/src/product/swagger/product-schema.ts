import { ApiResponseOptions } from '@nestjs/swagger';
import { createResponseSchema } from '../../common/swagger/response-schema';
import { ProductResponse } from '../application/dto/product.response';

export const ProductSuccessResponse: ApiResponseOptions = {
  status: 200,
  description: '주문 영수증 조회 성공',
  schema: createResponseSchema(ProductResponse),
};
