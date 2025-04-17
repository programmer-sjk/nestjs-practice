import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ResponseEntity } from '../common/response-entity';
import { BoardService } from './board.service';
import { AddBoardRequest } from './dto/add-board.request';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get(':id')
  async find(@Param('id') id: number) {
    const board = await this.boardService.find(id);
    return ResponseEntity.OK(board);
  }

  // 페이지네이션
  @Get()
  async findAll() {}

  @Post()
  async register(@Body() request: AddBoardRequest) {
    await this.boardService.add(request);
    return ResponseEntity.OK();
  }
}
