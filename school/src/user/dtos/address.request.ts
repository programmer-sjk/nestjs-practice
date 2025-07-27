import { IsNotEmpty, IsString } from 'class-validator';
import { Address } from '../entities/address.entity';
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

  toEntity() {
    return Address.of(this.street, this.city, this.zipCode);
  }
}
