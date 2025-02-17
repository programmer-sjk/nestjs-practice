import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Coupon } from '../entities/coupon.entity';
import { CouponType } from '../enums/coupon-type.enum';

export class CouponRegisterRequest {
  @IsNotEmpty()
  @MaxLength(32)
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(CouponType)
  type: CouponType;

  @IsNotEmpty()
  @IsInt()
  value: number;

  @IsNotEmpty()
  @IsInt()
  stock: number;

  @IsOptional()
  @IsString()
  description: string;

  toEntity() {
    return Coupon.of(
      this.name,
      this.type,
      this.value,
      this.stock,
      this.description,
    );
  }
}
