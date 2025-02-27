import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';
import { PointHistory } from './entities/point-history.entity';
import { Point } from './entities/point.entity';
import { PointType } from './enums/point-type.enum';
import { PointHistoryRepository } from './repositories/point-history.repository';
import { PointRepository } from './repositories/point.repository';

@Injectable()
export class PointService {
  private readonly SIGN_UP_POINT = 1_000;

  constructor(
    private readonly pointRepository: PointRepository,
    private readonly pointHistoryRepository: PointHistoryRepository,
  ) {}

  async getUserTotalPoint(userId: number) {
    const userPoint = await this.pointRepository.findBy({ userId });
    return userPoint.reduce((acc, cur) => acc + cur.value, 0);
  }

  @Transactional()
  async addPointByPurchase(userId: number, value: number) {
    await this.pointRepository.save(Point.of(userId, value));
    await this.pointHistoryRepository.save(
      PointHistory.of(userId, value, PointType.PURCHASE),
    );
  }

  @Transactional()
  async addSignUpPointToUser(userId: number) {
    await this.pointRepository.save(Point.of(userId, this.SIGN_UP_POINT));
    await this.pointHistoryRepository.save(
      PointHistory.of(userId, this.SIGN_UP_POINT, PointType.SIGNUP),
    );
  }
}
