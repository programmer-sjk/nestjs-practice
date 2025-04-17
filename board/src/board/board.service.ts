import { BadRequestException, Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { AddBoardRequest } from './dto/add-board.request';
import { RemoveBoardRequest } from './dto/remove-board.request';
import { UpdateBoardRequest } from './dto/update-board.request';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async find(id: number) {
    const board = await this.boardRepository.findOneBy({ id });
    if (!board) {
      throw new BadRequestException('게시물이 존재하지 않습니다.');
    }

    return board;
  }

  async findAll(limit, offset) {
    const board = await this.boardRepository.find({
      take: limit,
      skip: offset,
    });

    // 여기서 전체 페이지 개수나 row 추가예정
    return board;
  }

  async add(dto: AddBoardRequest) {
    return this.boardRepository.save(dto.toEntity());
  }

  async update(dto: UpdateBoardRequest) {
    const board = await this.find(dto.id);
    board.update(dto.title, dto.body);
    await this.boardRepository.save(board);
  }

  async remove(dto: RemoveBoardRequest) {
    const board = await this.find(dto.id);
    await this.boardRepository.remove(board);
  }
}
