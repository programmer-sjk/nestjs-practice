import { BadRequestException, Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';
import { ERROR } from '../common/err-message';
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

  async getUserPoint(userId: number) {
    return this.pointRepository.findOneBy({ userId });
  }

  @Transactional()
  async addPointByPurchase(userId: number, value: number) {
    const point = await this.getUserPoint(userId);
    const totalPoint = point?.value ?? 0 + value;

    await this.pointRepository.save(Point.of(userId, totalPoint));
    await this.pointHistoryRepository.save(
      PointHistory.of(userId, value, PointType.PURCHASE),
    );
  }

  @Transactional()
  async addSignUpPointToUser(userId: number) {
    const point = await this.getUserPoint(userId);
    const totalPoint = point?.value ?? 0 + this.SIGN_UP_POINT;

    await this.pointRepository.save(Point.of(userId, totalPoint));
    await this.pointHistoryRepository.save(
      PointHistory.of(userId, this.SIGN_UP_POINT, PointType.SIGNUP),
    );
  }

  async usePoint(userId: number, value: number, type: PointType) {
    const point = await this.getUserPoint(userId);
    const totalPoint = point?.value ?? 0 - value;

    if (totalPoint < 0) {
      throw new BadRequestException(ERROR.pointNotEnough);
    }

    await this.pointRepository.save(Point.of(userId, totalPoint));
    await this.pointHistoryRepository.save(
      PointHistory.of(userId, -value, type),
    );
  }
}
