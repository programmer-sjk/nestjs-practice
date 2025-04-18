import { Injectable } from '@nestjs/common';
import { AddCommentRequest } from './dto/add-comment.request';
import { CommentRepository } from './comment.repository';
import { UpdateCommentRequest } from './dto/update-comment.request';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async register(dto: AddCommentRequest) {
    return this.commentRepository.save(dto.toEntity())
  }

  async update(dto: UpdateCommentRequest) {
    const comment = await this.findComment(dto.id);
    comment.update(dto.body);
    await this.commentRepository.save(comment)
  }

  async remove() {}

  private async findComment(id: number) {
    return this.commentRepository.findOneBy({ id })
  }
}
