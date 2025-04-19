import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { ResponseEntity } from '../common/response-entity';
import { CommentService } from './comment.service';
import { AddCommentRequest } from './dto/add-comment.request';
import { FindUserCommentRequest } from './dto/find-user-comment.request';
import { RemoveCommentRequest } from './dto/remove-comment.request';
import { UpdateCommentRequest } from './dto/update-comment.request';

@Roles(Role.USER)
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('/user')
  async findUserComments(@Body() request: FindUserCommentRequest) {
    const comments = await this.commentService.findUserComments(request);
    return ResponseEntity.OK(comments);
  }

  @Post()
  async register(@Body() request: AddCommentRequest) {
    await this.commentService.register(request);
    return ResponseEntity.OK();
  }

  @Patch()
  async update(@Body() request: UpdateCommentRequest) {
    await this.commentService.update(request);
    return ResponseEntity.OK();
  }

  @Delete()
  async remove(@Body() request: RemoveCommentRequest) {
    await this.commentService.remove(request);
    return ResponseEntity.OK();
  }
}
