import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PointController } from './point.controller';
import { PointRepository } from './point.repository';
import { PointService } from './point.service';

@Module({
  imports: [UserModule],
  providers: [PointService, PointRepository],
  controllers: [PointController],
})
export class PointModule {}
