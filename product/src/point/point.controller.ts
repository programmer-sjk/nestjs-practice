import { Body, Controller, Post } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { PointPurchaseRequest } from './dto/point-purchase.request';
import { PointService } from './point.service';

@Controller('point')
export class PointController {
  constructor(private readonly pointService: PointService) {}

  @Roles(Role.USER)
  @Post()
  async purchase(@Body() request: PointPurchaseRequest) {
    await this.pointService.addPointToUser(request.userId, request.value);
  }
}
