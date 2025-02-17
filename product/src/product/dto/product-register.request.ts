import { IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class ProductRegisterRequest {
  @IsNotEmpty()
  @MaxLength(32)
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  price: number;

  @IsNotEmpty()
  @IsInt()
  stock: number;
}