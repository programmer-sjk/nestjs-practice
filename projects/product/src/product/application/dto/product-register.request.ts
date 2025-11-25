import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Product } from '../../domain/entities/product.entity';

export class ProductRegisterRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  storeId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  basePrice: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @ApiProperty()
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
