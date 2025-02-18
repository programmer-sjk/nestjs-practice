import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CouponUser } from '../entities/coupon-user.entity';

@Injectable()
export class CouponUserRepository extends Repository<CouponUser> {
  constructor(private readonly dataSource: DataSource) {
    super(CouponUser, dataSource.createEntityManager());
  }
}
