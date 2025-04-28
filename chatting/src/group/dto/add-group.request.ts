import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { Group } from '../entities/group.entity';

export class AddGroupRequest {
  @IsNotEmpty()
  @MaxLength(32)
  @IsString()
  name: string;

  @IsArray()
  @IsNumber({}, { each: true })
  userIds: number[];

  toEntity() {
    return Group.of(this.name, this.email, this.phoneNumber);
  }
}
