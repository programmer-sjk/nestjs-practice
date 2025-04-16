import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { AddBoardRequest } from './dto/add-board.request';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async add(dto: AddBoardRequest) {
    return this.boardRepository.save(dto.toEntity())
  }
}
