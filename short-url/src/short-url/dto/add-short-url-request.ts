import { IsNotEmpty, IsString } from 'class-validator';

export class AddShortUrlRequest {
  @IsNotEmpty()
  @IsString()
  longUrl: string;
}
