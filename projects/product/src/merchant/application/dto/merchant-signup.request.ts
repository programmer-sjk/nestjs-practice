import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { BusinessType } from '../../domain/enums/business-type.enum';
import { Merchant } from '../../domain/entities/merchant.entity';

export class MerchantSignUpRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(12)
  @IsString()
  businessNumber: string;

  @ApiProperty({ enum: BusinessType })
  @IsNotEmpty()
  @IsEnum(BusinessType)
  businessType: BusinessType;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  representativeName: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(20)
  @IsString()
  phoneNumber: string;

  toEntity() {
    return Merchant.of(
      this.email,
      this.password,
      this.businessNumber,
      this.businessType,
      this.representativeName,
      this.phoneNumber,
    );
  }
}
