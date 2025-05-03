import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class LeaveGroupRequest {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  groupId: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  userId: number;
}
