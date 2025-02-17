import { Module } from '@nestjs/common';
import { PointController } from './point.controller';
import { PointRepository } from './point.repository';
import { PointService } from './point.service';

@Module({
  providers: [PointService, PointRepository],
  controllers: [PointController],
})
export class PointModule {}
