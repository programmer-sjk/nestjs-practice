import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProductOptionGroup } from '../../domain/entities/product-option-group.entity';
import { ProductOptionValue } from '../../domain/entities/product-option-value.entity';
import { Product } from '../../domain/entities/product.entity';

export class OptionGroupRegisterInputs {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  displayOrder?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OptionValueRegisterInputs)
  @IsArray()
  optionValues?: OptionValueRegisterInputs[];

  toEntity() {
    return ProductOptionGroup.of(
      this.name,
      this.displayOrder,
      this.isRequired,
      this.optionValues?.map((optionValue) => optionValue.toEntity()),
    );
  }
}

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

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OptionGroupRegisterInputs)
  @IsArray()
  optionGroups?: OptionGroupRegisterInputs[];

  toEntity() {
    return Product.of(
      this.storeId,
      this.name,
      this.basePrice,
      this.description,
      this.thumbnailUrl,
      this.categoryId,
      this.optionGroups?.map((option) => option.toEntity()),
    );
  }
}

export class OptionValueRegisterInputs {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  value: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  additionalPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  displayOrder?: number;

  toEntity() {
    return ProductOptionValue.of(
      this.value,
      this.additionalPrice,
      this.displayOrder,
    );
  }
}
