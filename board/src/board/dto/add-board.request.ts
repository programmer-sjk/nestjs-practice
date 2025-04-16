import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Board } from '../entities/board.entity';

export class AddBoardRequest {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1024)
  body: string;

  toEntity() {
    return Board.of(this.userId, this.title, this.body);
  }
}
