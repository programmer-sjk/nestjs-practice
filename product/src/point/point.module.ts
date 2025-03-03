import { Module } from '@nestjs/common';
import { PointController } from './point.controller';
import { PointService } from './point.service';
import { PointHistoryRepository } from './repositories/point-history.repository';

@Module({
  controllers: [PointController],
  providers: [PointService, PointHistoryRepository],
  exports: [PointService],
})
export class PointModule {}
