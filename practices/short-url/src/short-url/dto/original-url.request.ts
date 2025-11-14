import { IsNotEmpty, IsString } from 'class-validator';

export class OriginalUrlRequest {
  @IsNotEmpty()
  @IsString()
  shortUrl: string;
}
