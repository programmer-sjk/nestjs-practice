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
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { ResponseEntity } from '../common/response-entity';
import { AddPostRequest } from './dto/add-post.request';
import { FindAllPostRequest } from './dto/find-all-post.request';
import { FindUserPostRequest } from './dto/find-user-post.request';
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
    const posts = await this.postService.findAll(
      query.limit,
      query.offset ?? 0,
    );
    return ResponseEntity.OK(posts);
  }

  @Roles(Role.USER)
  @Get('/user')
  async findUserPosts(@Body() request: FindUserPostRequest) {
    const posts = await this.postService.findUserPosts(request);
    return ResponseEntity.OK(posts);
  }

  @Roles(Role.USER)
  @Post()
  async register(@Body() request: AddPostRequest) {
    await this.postService.add(request);
    return ResponseEntity.OK();
  }

  @Roles(Role.USER)
  @Put()
  async update(@Body() request: UpdatePostRequest) {
    await this.postService.update(request);
    return ResponseEntity.OK();
  }

  @Roles(Role.USER)
  @Delete()
  async remove(@Body() request: RemovePostRequest) {
    await this.postService.remove(request);
    return ResponseEntity.OK();
  }
}
