import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Address } from '../entities/address.entity';

export class SignUpRequest {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  passWord: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Address)
  address: Address;
}
