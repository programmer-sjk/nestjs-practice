import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AddChatRequest {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  groupId: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  ownerId: number;

  @IsNotEmpty()
  @IsString()
  body: string;
}
