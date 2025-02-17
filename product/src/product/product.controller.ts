import { Body, Controller, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ResponseEntity } from './../common/response-entity';
import { ProductRegisterRequest } from './dto/product-register.request';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async register(@Body() request: ProductRegisterRequest) {
    await this.productService.addProduct(request);
    return ResponseEntity.OK();
  }
}
