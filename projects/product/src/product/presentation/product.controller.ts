import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductRegisterRequest } from '../application/dto/product-register.request';
import { ProductService } from '../application/services/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  async find(@Param('id') id: number) {
    return this.productService.find(id);
  }

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Post()
  async register(@Body() dto: ProductRegisterRequest) {
    return this.productService.register(dto);
  }
}
