import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AutoCompleteKeywords {
  @IsNotEmpty()
  @MaxLength(10)
  @IsString()
  keyword: string;
}
