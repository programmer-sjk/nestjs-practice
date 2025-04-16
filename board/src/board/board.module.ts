import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardRepository } from './board.repository';
import { BoardService } from './board.service';

@Module({
  providers: [BoardService, BoardRepository],
  controllers: [BoardController],
})
export class BoardModule {}
