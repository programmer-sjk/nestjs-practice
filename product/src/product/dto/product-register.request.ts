import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Product } from '../entities/product.entity';

export class ProductRegisterRequest {
  @IsNotEmpty()
  @MaxLength(32)
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  price: number;

  @IsNotEmpty()
  @IsInt()
  stock: number;

  @IsNotEmpty()
  @IsInt()
  categoryId: number;

  toEntity() {
    return Product.of(this.name, this.price, this.stock, this.categoryId);
  }
}
