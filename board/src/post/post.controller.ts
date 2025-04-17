import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ResponseEntity } from '../common/response-entity';
import { AddPostRequest } from './dto/add-post.request';
import { FindAllPostRequest } from './dto/find-all-post.request';
import { RemovePostRequest } from './dto/remove-post.request';
import { UpdatePostRequest } from './dto/update-post.request';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  async find(@Param('id') id: number) {
    const post = await this.postService.find(id);
    return ResponseEntity.OK(post);
  }

  @Get()
  async findAll(@Query() query: FindAllPostRequest) {
    const post = await this.postService.findAll(
      query.limit,
      query.offset ?? 0,
    );
    return ResponseEntity.OK(post);
  }

  @Post()
  async register(@Body() request: AddPostRequest) {
    await this.postService.add(request);
    return ResponseEntity.OK();
  }

  @Put()
  async update(@Body() request: UpdatePostRequest) {
    await this.postService.update(request);
    return ResponseEntity.OK();
  }

  @Delete()
  async remove(@Body() request: RemovePostRequest) {
    await this.postService.remove(request);
    return ResponseEntity.OK();
  }
}
