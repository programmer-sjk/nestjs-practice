import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PointHistoryDetail } from '../entities/point-history-detail.entity';

@Injectable()
export class PointHistoryDetailRepository extends Repository<PointHistoryDetail> {
  constructor(private readonly dataSource: DataSource) {
    super(PointHistoryDetail, dataSource.createEntityManager());
  }

  async getAvaiablePointHistoryIds(userId: number) {
    const results = await this.createQueryBuilder('detail')
      .select('detail.pointHistoryId AS pointHistoryId')
      .where('detail.userId = :userId', { userId })
      .groupBy('detail.pointHistoryId')
      .having('SUM(detail.value) > 0')
      .getRawMany();
    return results.map((result) => result.pointHistoryId);
  }
}
