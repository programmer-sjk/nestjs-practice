import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ResponseEntity } from '../common/response-entity';
import { BoardService } from './board.service';
import { AddBoardRequest } from './dto/add-board.request';
import { FindAllBoardRequest } from './dto/find-all-board.request';
import { UpdateBoardRequest } from './dto/update-board.request';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get(':id')
  async find(@Param('id') id: number) {
    const board = await this.boardService.find(id);
    return ResponseEntity.OK(board);
  }

  @Get()
  async findAll(@Query() query: FindAllBoardRequest) {
    const board = await this.boardService.findAll(
      query.limit,
      query.offset ?? 0,
    );
    return ResponseEntity.OK(board);
  }

  @Post()
  async register(@Body() request: AddBoardRequest) {
    await this.boardService.add(request);
    return ResponseEntity.OK();
  }

  @Put()
  async update(@Body() request: UpdateBoardRequest) {
    await this.boardService.update(request);
    return ResponseEntity.OK();
  }
}
