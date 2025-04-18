import { Injectable } from '@nestjs/common';
import { AddCommentRequest } from './dto/add-comment.request';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async register(dto: AddCommentRequest) {
    return this.commentRepository.save(dto.toEntity())
  }

  async update() {}

  async remove() {}
}
