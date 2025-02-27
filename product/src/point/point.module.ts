import { Module } from '@nestjs/common';
import { PointController } from './point.controller';
import { PointService } from './point.service';
import { PointHistoryRepository } from './repositories/point-history.repository';
import { PointRepository } from './repositories/point.repository';

@Module({
  controllers: [PointController],
  providers: [PointService, PointRepository, PointHistoryRepository],
  exports: [PointService],
})
export class PointModule {}
