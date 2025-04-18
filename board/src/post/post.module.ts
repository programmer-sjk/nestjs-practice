import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  // imports: [CommentModule],
  providers: [PostService, PostRepository],
  controllers: [PostController],
})
export class PostModule {}
