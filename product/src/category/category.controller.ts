import { Body, Controller, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ResponseEntity } from './../common/response-entity';
import { RegisterRequest } from './dto/register.request';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async register(@Body() request: RegisterRequest) {
    await this.categoryService.addCategory(request);
    return ResponseEntity.OK();
  }
}
