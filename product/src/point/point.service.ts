import { BadRequestException, Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { In } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { OrderBy } from '../common/enums/order-by.enum';
import { ERROR } from '../common/err-message';
import { PointHistoryResponse } from './dto/point-history.response';
import { PointHistoryDetail } from './entities/point-history-detail.entity';
import { PointHistory } from './entities/point-history.entity';
import { PointType } from './enums/point-type.enum';
import { PointHistoryDetailRepository } from './repositories/point-history-detail.repository';
import { PointHistoryRepository } from './repositories/point-history.repository';

@Injectable()
export class PointService {
  private readonly SIGN_UP_POINT = 1_000;

  constructor(
    private readonly pointHistoryRepository: PointHistoryRepository,
    private readonly historyDetailRepository: PointHistoryDetailRepository,
  ) {}

  async findHistory(userId: number) {
    const histories = await this.pointHistoryRepository.find({
      where: { userId },
      order: { id: OrderBy.DESC },
    });

    return histories.map(
      (history) =>
        new PointHistoryResponse(
          history.id,
          history.status,
          history.userId,
          history.value,
          history.type,
          history.expiredAt,
          history.createdAt,
        ),
    );
  }

  async canUsePoint(userId: number, usePoint: number) {
    const points = await this.getUserPoints(userId);
    return points.reduce((acc, cur) => acc + cur.value, 0) >= usePoint;
  }

  private async getUserPoints(userId: number) {
    const availablePointHistoryIds =
      await this.historyDetailRepository.getAvaiablePointHistoryIds(userId);

    return this.historyDetailRepository.find({
      where: { userId, pointHistoryId: In(availablePointHistoryIds) },
      order: { id: OrderBy.ASC },
    });
  }

  @Transactional()
  async addPointByPurchase(userId: number, value: number) {
    const point = await this.pointHistoryRepository.save(
      PointHistory.earn(userId, value, PointType.PURCHASE),
    );

    await this.historyDetailRepository.save(
      PointHistoryDetail.earn(userId, value, point.id),
    );
  }

  @Transactional()
  async addSignUpPointToUser(userId: number) {
    const expiredAt = DateTime.now().plus({ months: 3 });
    const point = await this.pointHistoryRepository.save(
      PointHistory.earn(
        userId,
        this.SIGN_UP_POINT,
        PointType.SIGNUP,
        expiredAt,
      ),
    );

    await this.historyDetailRepository.save(
      PointHistoryDetail.earn(userId, this.SIGN_UP_POINT, point.id),
    );
  }

  @Transactional()
  async usePoint(userId: number, value: number, type: PointType) {
    const points = await this.getUserPoints(userId);
    const willBeUsedPoints = [];
    const totalPoint = points.reduce((acc, point) => {
      if (acc < value) {
        const usePoint = acc + point.value > value ? value - acc : point.value;
        willBeUsedPoints.push({ ...point, usePoint });
      }

      return acc + point.value;
    }, 0);

    if (totalPoint < value) {
      throw new BadRequestException(ERROR.pointNotEnough);
    }

    await this.pointHistoryRepository.save(
      PointHistory.use(userId, -value, type),
    );

    for (const target of willBeUsedPoints) {
      await this.historyDetailRepository.save(
        PointHistoryDetail.use(userId, -target.usePoint, target.pointHistoryId),
      );
    }
  }
}
