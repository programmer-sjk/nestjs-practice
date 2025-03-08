import { BadRequestException, Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { IsNull, MoreThan, Or } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { DateUtil } from '../common/date-util';
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

  async getUserTotalPoint(userId: number) {
    const points = await this.getUserPoints(userId);
    return points.reduce((acc, cur) => acc + cur.value, 0);
  }

  private async getUserPoints(userId: number) {
    return this.pointHistoryRepository.find({
      where: {
        userId,
        expiredAt: Or(
          IsNull(),
          MoreThan(DateUtil.now().toFormat('yyyy-MM-dd HH:mm:ss')),
        ),
      },
      order: {
        expiredAt: OrderBy.ASC,
      },
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
    const userPoint = await this.getUserTotalPoint(userId);
    const totalPoint = userPoint - value;

    if (totalPoint < 0) {
      throw new BadRequestException(ERROR.pointNotEnough);
    }

    const point = await this.pointHistoryRepository.save(
      PointHistory.use(userId, -value, type),
    );

    await this.historyDetailRepository.save(
      PointHistoryDetail.use(userId, -value, point.id),
    );
  }
}
