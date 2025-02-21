import { Body, Controller, Post } from '@nestjs/common';
import { PointPurchaseRequest } from './dto/point-purchase.request';
import { PointService } from './point.service';

@Controller('point')
export class PointController {
  constructor(private readonly pointService: PointService) {}

  @Post()
  async purchase(@Body() request: PointPurchaseRequest) {
    await this.pointService.addPointToUser(request.userId, request.value);
  }
}
