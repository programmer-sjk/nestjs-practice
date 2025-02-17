import { Body, Controller, Post } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { ResponseEntity } from './../common/response-entity';
import { ProductRegisterRequest } from './dto/product-register.request';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(Role.ADMIN)
  @Post()
  async register(@Body() request: ProductRegisterRequest) {
    await this.productService.addProduct(request);
    return ResponseEntity.OK();
  }
}
