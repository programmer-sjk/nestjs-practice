import { Injectable } from '@nestjs/common';
import { Point } from './entities/point.entity';
import { PointRepository } from './point.repository';

@Injectable()
export class PointService {
  constructor(private readonly pointRepository: PointRepository) {}

  async addPointToUser(userId: number, value: number) {
    await this.pointRepository.save(Point.of(userId, value));
  }
}
