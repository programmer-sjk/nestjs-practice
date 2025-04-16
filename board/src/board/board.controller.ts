import { Body, Controller, Post } from '@nestjs/common';
import { ResponseEntity } from '../common/response-entity';
import { BoardService } from './board.service';
import { AddBoardRequest } from './dto/add-board.request';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  async register(@Body() request: AddBoardRequest) {
    await this.boardService.add(request)
    return ResponseEntity.OK()
  }
}
