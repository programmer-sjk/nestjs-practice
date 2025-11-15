import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ResponseEntity } from '../../common/response-entity';
import { ProductRegisterRequest } from '../application/dto/product-register.request';
import { ProductService } from '../application/services/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  async find(@Param('id') id: number) {
    const result = await this.productService.find(id);
    return ResponseEntity.OK(result);
  }

  @Get()
  async findAll() {
    const result = await this.productService.findAll();
    return ResponseEntity.OK(result);
  }

  @Post()
  async register(@Body() dto: ProductRegisterRequest) {
    await this.productService.register(dto);
    return ResponseEntity.OK();
  }
}
