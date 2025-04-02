import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ShortUrl {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  original: string;

  @Index({ unique: true })
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
