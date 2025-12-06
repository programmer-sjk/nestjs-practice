import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { Merchant } from '../../domain/entities/merchant.entity';
import { BusinessType } from '../../domain/enums/business-type.enum';

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

  toEntity(hashedPassword: string) {
    return Merchant.of(
      this.email,
      hashedPassword,
      this.businessNumber,
      this.businessType,
      this.representativeName,
      this.phoneNumber,
    );
  }
}
