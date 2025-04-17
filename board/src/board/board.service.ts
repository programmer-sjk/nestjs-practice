import { Injectable, BadRequestException } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { AddBoardRequest } from './dto/add-board.request';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async find(id: number) {
    const board = await this.boardRepository.findOneBy({ id });
    if (!board) {
      throw new BadRequestException('게시물이 존재하지 않습니다.')
    }

    return board;
  }

  async add(dto: AddBoardRequest) {
    return this.boardRepository.save(dto.toEntity())
  }
}
