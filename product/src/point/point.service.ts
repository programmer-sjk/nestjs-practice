import { BadRequestException, Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { IsNull, MoreThan, Or } from 'typeorm';
import { DateUtil } from '../common/date-util';
import { OrderBy } from '../common/enums/order-by.enum';
import { ERROR } from '../common/err-message';
import { PointHistoryResponse } from './dto/point-history.response';
import { PointHistory } from './entities/point-history.entity';
import { PointType } from './enums/point-type.enum';
import { PointHistoryRepository } from './repositories/point-history.repository';

@Injectable()
export class PointService {
  private readonly SIGN_UP_POINT = 1_000;

  constructor(
    private readonly pointHistoryRepository: PointHistoryRepository,
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
    const points = await this.pointHistoryRepository.findBy({
      userId,
      expiredAt: Or(
        IsNull(),
        MoreThan(DateUtil.now().toFormat('yyyy-MM-dd HH:mm:ss')),
      ),
    });
    return points.reduce((acc, cur) => acc + cur.value, 0);
  }

  async addPointByPurchase(userId: number, value: number) {
    await this.pointHistoryRepository.save(
      PointHistory.earn(userId, value, PointType.PURCHASE),
    );
  }

  async addSignUpPointToUser(userId: number) {
    const expiredAt = DateTime.now().plus({ months: 3 });
    await this.pointHistoryRepository.save(
      PointHistory.earn(
        userId,
        this.SIGN_UP_POINT,
        PointType.SIGNUP,
        expiredAt,
      ),
    );
  }

  async usePoint(userId: number, value: number, type: PointType) {
    const point = await this.getUserTotalPoint(userId);
    const totalPoint = point - value;

    if (totalPoint < 0) {
      throw new BadRequestException(ERROR.pointNotEnough);
    }

    await this.pointHistoryRepository.save(
      PointHistory.use(userId, -value, type),
    );
  }
}
