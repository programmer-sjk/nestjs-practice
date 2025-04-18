import { BadRequestException, Injectable } from '@nestjs/common';
import { PaginationResponse } from '../common/pagination-response';
import { AddPostRequest } from './dto/add-post.request';
import { RemovePostRequest } from './dto/remove-post.request';
import { UpdatePostRequest } from './dto/update-post.request';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async find(id: number) {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new BadRequestException('게시물이 존재하지 않습니다.');
    }

    return post;
  }

  async findAll(limit, offset) {
    const postsAndCount = await this.postRepository.findAndCount({
      take: limit,
      skip: offset,
      order: { id: 'DESC' },
    });

    const totalCount = postsAndCount[1];
    const totalPage = Math.ceil(totalCount / limit);

    return new PaginationResponse(
      limit,
      offset,
      totalCount,
      totalPage,
      postsAndCount[0],
    );
  }

  async add(dto: AddPostRequest) {
    return this.postRepository.save(dto.toEntity());
  }

  async update(dto: UpdatePostRequest) {
    const post = await this.find(dto.id);
    this.validate(dto.userId, post.userId);

    post.update(dto.title, dto.body);
    await this.postRepository.save(post);
  }

  async remove(dto: RemovePostRequest) {
    const post = await this.find(dto.id);
    this.validate(dto.userId, post.userId);
    await this.postRepository.remove(post);
  }

  private validate(userId: number, postUseId: number) {
    if (userId != postUseId) {
      throw new BadRequestException('권한이 없습니다.');
    }
  }
}
