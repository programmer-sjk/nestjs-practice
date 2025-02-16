import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Category } from '../entities/category.entity';

export class RegisterRequest {
  @IsNotEmpty()
  @MaxLength(16)
  @IsString()
  name: string;

  toEntity() {
    return Category.of(this.name);
  }
}
