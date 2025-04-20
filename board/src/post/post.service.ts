import { BadRequestException, Injectable } from '@nestjs/common';
import { Like } from 'typeorm';
import { CommentService } from '../comment/comment.service';
import { Comment } from '../comment/entities/comment.entity';
import { PaginationResponse } from '../common/pagination-response';
import { AddPostRequest } from './dto/add-post.request';
import { FindUserPostRequest } from './dto/find-user-post.request';
import { PostResponse } from './dto/post.response';
import { RemovePostRequest } from './dto/remove-post.request';
import { UpdatePostRequest } from './dto/update-post.request';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly commentService: CommentService,
    private readonly postRepository: PostRepository,
  ) {}

  async find(id: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['comments'],
      order: {
        comments: {
          id: 'DESC',
        },
      },
    });

    if (!post) {
      throw new BadRequestException('게시물이 존재하지 않습니다.');
    }

    return new PostResponse(post, this.convertComments(post.comments));
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

  async findUserPosts(dto: FindUserPostRequest) {
    const postsAndCount = await this.postRepository.findAndCount({
      where: { userId: dto.userId },
      take: dto.limit,
      skip: dto.offset,
      order: { id: 'DESC' },
    });

    const totalCount = postsAndCount[1];
    const totalPage = Math.ceil(totalCount / dto.limit);

    return new PaginationResponse(
      dto.limit,
      dto.offset,
      totalCount,
      totalPage,
      postsAndCount[0],
    );
  }

  async search(keyword: string) {
    return this.postRepository.findBy({ title: Like(`%${keyword}%`) });
  }

  async add(dto: AddPostRequest) {
    return this.postRepository.save(dto.toEntity());
  }

  async update(dto: UpdatePostRequest) {
    const post = await this.findOne(dto.id);
    this.validate(dto.userId, post.userId);

    post.update(dto.title, dto.body);
    await this.postRepository.save(post);
  }

  async remove(dto: RemovePostRequest) {
    const post = await this.findOne(dto.id);
    this.validate(dto.userId, post.userId);
    await this.postRepository.remove(post);
    await this.commentService.removeByPostId(dto.id);
  }

  private validate(userId: number, postUseId: number) {
    if (userId != postUseId) {
      throw new BadRequestException('권한이 없습니다.');
    }
  }

  private async findOne(id: number) {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new BadRequestException('게시물이 존재하지 않습니다.');
    }

    return post;
  }

  private convertComments(comments: Comment[]) {
    const parentComments = comments.filter((comment) => !comment.parentId);
    const replyComments = comments.filter((comment) => comment.parentId);

    return parentComments.map((parent) => {
      const childs = replyComments.filter(
        (child) => child.parentId === parent.id,
      );
      parent['reply'] = childs;
      return parent;
    });
  }
}
