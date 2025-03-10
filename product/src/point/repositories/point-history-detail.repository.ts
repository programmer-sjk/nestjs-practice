import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { OrderBy } from '../../common/enums/order-by.enum';
import { PointHistoryDetail } from '../entities/point-history-detail.entity';

@Injectable()
export class PointHistoryDetailRepository extends Repository<PointHistoryDetail> {
  constructor(private readonly dataSource: DataSource) {
    super(PointHistoryDetail, dataSource.createEntityManager());
  }

  async getAvaiableUserPointIds(userId: number) {
    return this.createQueryBuilder('detail')
      .select('detail.id')
      .where('detail.userId = :userId', { userId })
      .orderBy('detail.id', OrderBy.ASC)
      .groupBy('detail.pointHistoryId')
      .having('SUM(detail.value) > 0')
      .getRawMany();
  }
}
