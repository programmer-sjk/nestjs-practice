import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ShortUrl {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  original: string;

  @Column()
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  static of(longUrl: string, shortUrl: string) {
    const entity = new ShortUrl();
    entity.original = longUrl;
    entity.url = shortUrl;

    return entity;
  }
}
