import { IsNotEmpty, IsString } from 'class-validator';

export class AddressRequest {
  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  zipCode: string;
}
