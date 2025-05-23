import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CommentModule } from '../comment/comment.module';
import { RedisModule } from '../redis/redis.module';
import { PostListener } from './listeners/search-listener';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  imports: [CommentModule, RedisModule, EventEmitterModule.forRoot()],
  providers: [PostService, PostRepository, PostListener],
  controllers: [PostController],
})
export class PostModule {}
