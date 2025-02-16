import { Body, Controller, Post } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { ResponseEntity } from './../common/response-entity';
import { CategoryService } from './category.service';
import { RegisterRequest } from './dto/register.request';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Roles(Role.ADMIN)
  @Post()
  async register(@Body() request: RegisterRequest) {
    await this.categoryService.addCategory(request);
    return ResponseEntity.OK();
  }
}
