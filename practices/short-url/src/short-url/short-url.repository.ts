import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ShortUrl } from './entities/short-url.entity';

@Injectable()
export class ShortUrlRepository extends Repository<ShortUrl> {
  constructor(private readonly dataSource: DataSource) {
    super(ShortUrl, dataSource.createEntityManager());
  }
}
