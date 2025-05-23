import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostRepository extends Repository<Post> {
  constructor(private readonly dataSource: DataSource) {
    super(Post, dataSource.createEntityManager());
  }
}
