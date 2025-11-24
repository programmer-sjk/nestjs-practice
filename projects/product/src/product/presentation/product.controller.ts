import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ResponseEntity } from '../../common/response-entity';
import { ProductRegisterRequest } from '../application/dto/product-register.request';
import { ProductUpdateRequest } from '../application/dto/product-update.request';
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

  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: ProductUpdateRequest) {
    await this.productService.update(id, dto);
    return ResponseEntity.OK();
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.productService.remove(id);
    return ResponseEntity.OK();
  }
}
