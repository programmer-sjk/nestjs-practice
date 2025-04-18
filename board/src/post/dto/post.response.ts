import { Exclude, Expose } from 'class-transformer';
import { Comment } from '../../comment/entities/comment.entity';
import { Post } from './../entities/post.entity';

export class PostResponse {
  @Exclude() private _id: number;
  @Exclude() private _userId: number;
  @Exclude() private _title: string;
  @Exclude() private _body: string;
  @Exclude() private _comments: Comment[];

  constructor(post: Post, comments: Comment[]) {
    this._id = post.id;
    this._userId = post.userId;
    this._title = post.title;
    this._body = post.body;
    this._comments = comments;
  }

  @Expose()
  get id() {
    return this._id;
  }
  @Expose()
  get userId() {
    return this._userId;
  }
  @Expose()
  get title() {
    return this._title;
  }
  @Expose()
  get body() {
    return this._body;
  }
  @Expose()
  get comments() {
    return this._comments;
  }
}
