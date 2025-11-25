import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseEntity } from '../../common/response-entity';
import { MutationResponseSchema } from '../../common/swagger/response-schema';
import { ProductRegisterRequest } from '../application/dto/product-register.request';
import { ProductUpdateRequest } from '../application/dto/product-update.request';
import { ProductResponse } from '../application/dto/product.response';
import { ProductService } from '../application/services/product.service';
import { ProductSuccessResponse } from '../swagger/product-schema';

@ApiTags('products')
@ApiExtraModels(ResponseEntity, ProductResponse)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: '상품 상세 조회' })
  @ApiResponse(ProductSuccessResponse)
  @Get(':id')
  async find(@Param('id') id: number) {
    const result = await this.productService.find(id);
    return ResponseEntity.OK(result);
  }

  @ApiOperation({ summary: '상품 목록 조회' })
  @ApiResponse({ status: 200, type: [ProductResponse] })
  @Get()
  async findAll() {
    const result = await this.productService.findAll();
    return ResponseEntity.OK(result);
  }

  @ApiOperation({ summary: '상품 등록' })
  @ApiResponse(MutationResponseSchema)
  @Post()
  async register(@Body() dto: ProductRegisterRequest) {
    await this.productService.register(dto);
    return ResponseEntity.OK();
  }

  @ApiOperation({ summary: '상품 수정' })
  @ApiResponse(MutationResponseSchema)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: ProductUpdateRequest) {
    await this.productService.update(id, dto);
    return ResponseEntity.OK();
  }

  @ApiOperation({ summary: '상품 삭제' })
  @ApiResponse(MutationResponseSchema)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.productService.remove(id);
    return ResponseEntity.OK();
  }
}
