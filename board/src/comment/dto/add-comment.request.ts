import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Comment } from '../entities/comment.entity';

export class AddCommentRequest {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  postId: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  parentId?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  body: string;

  toEntity() {
    return Comment.of(this.userId, this.postId, this.body, this.parentId);
  }
}
