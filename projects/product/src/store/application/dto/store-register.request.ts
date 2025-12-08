import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Store } from '../../domain/entities/store.entity';

export class StoreRegisterRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  addressDetail?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  zipCode?: string;

  toEntity(merchantId: number) {
    return Store.of(
      merchantId,
      this.name,
      this.address,
      this.addressDetail,
      this.zipCode,
    );
  }
}
