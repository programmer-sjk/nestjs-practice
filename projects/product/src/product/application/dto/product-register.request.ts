import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Product } from '../../domain/entities/product.entity';

export class ProductRegisterRequest {
  @IsNotEmpty()
  @IsNumber()
  storeId: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  basePrice: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @IsOptional()
  @IsNumber()
  categoryId?: number;

  toEntity() {
    return Product.of(
      this.storeId,
      this.name,
      this.basePrice,
      this.description,
      this.thumbnailUrl,
      this.categoryId,
    );
  }
}
