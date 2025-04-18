import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { AddCommentRequest } from './dto/add-comment.request';
import { RemoveCommentRequest } from './dto/remove-comment.request';
import { UpdateCommentRequest } from './dto/update-comment.request';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async register(dto: AddCommentRequest) {
    return this.commentRepository.save(dto.toEntity());
  }

  async update(dto: UpdateCommentRequest) {
    const comment = await this.findComment(dto.id);
    comment.update(dto.body);
    await this.commentRepository.save(comment);
  }

  async remove(dto: RemoveCommentRequest) {
    const comment = await this.findComment(dto.id);
    await this.commentRepository.remove(comment);
  }

  private async findComment(id: number) {
    return this.commentRepository.findOneBy({ id });
  }
}
