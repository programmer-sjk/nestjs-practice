import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class InviteGroupRequest {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  groupId: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  inviteeId: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  invitorId: number;
}
