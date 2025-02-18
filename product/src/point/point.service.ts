import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { Point } from './entities/point.entity';
import { PointRepository } from './point.repository';

@Injectable()
export class PointService {
  constructor(
    private readonly userService: UserService,
    private readonly pointRepository: PointRepository,
  ) {}

  async addPointToUser(userId: number, value: number) {
    const user = await this.userService.findOneById(userId);
    if (!user) {
      throw new BadRequestException('존재하지 않는 사용자입니다.');
    }

    await this.pointRepository.save(Point.of(userId, value));
  }
}
