import { Body, Controller, Delete, Patch, Post } from '@nestjs/common';
import { ResponseEntity } from '../common/response-entity';
import { CommentService } from './comment.service';
import { AddCommentRequest } from './dto/add-comment.request';
import { UpdateCommentRequest } from './dto/update-comment.request';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async register(@Body() request: AddCommentRequest) {
    await this.commentService.register(request);
    return ResponseEntity.OK()
  }

  @Patch()
  async update(@Body() request: UpdateCommentRequest) {
    await this.commentService.update(request);
    return ResponseEntity.OK()
  }

  @Delete()
  async remove() {
    await this.commentService.remove();
    return ResponseEntity.OK()
  }
}
