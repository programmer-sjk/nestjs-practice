import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { AddressRequest } from './address.request';

export class SignUpRequest {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  passWord: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressRequest)
  address: AddressRequest;
}
