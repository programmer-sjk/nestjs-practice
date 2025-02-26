import { Injectable } from '@nestjs/common';
import { Point } from './entities/point.entity';
import { PointRepository } from './point.repository';

@Injectable()
export class PointService {
  private readonly SIGN_UP_POINT = 1_000;

  constructor(private readonly pointRepository: PointRepository) {}

  async getUserTotalPoint(userId: number) {
    const userPoint = await this.pointRepository.findBy({ userId });
    return userPoint.reduce((acc, cur) => acc + cur.value, 0);
  }

  async addPointToUser(userId: number, value: number) {
    await this.pointRepository.save(Point.of(userId, value));
  }

  async addSignUpPointToUser(userId: number) {
    await this.pointRepository.save(Point.of(userId, this.SIGN_UP_POINT));
  }
}
