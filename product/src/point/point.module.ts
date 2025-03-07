import { Module } from '@nestjs/common';
import { PointController } from './point.controller';
import { PointService } from './point.service';
import { PointHistoryDetailRepository } from './repositories/point-history-detail.repository';
import { PointHistoryRepository } from './repositories/point-history.repository';

@Module({
  controllers: [PointController],
  providers: [
    PointService,
    PointHistoryRepository,
    PointHistoryDetailRepository,
  ],
  exports: [PointService],
})
export class PointModule {}
