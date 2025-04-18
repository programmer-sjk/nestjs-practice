import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';

@Module({
  providers: [CommentService, CommentRepository],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentModule {}
