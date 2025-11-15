import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from '../application/product.service';

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
}
