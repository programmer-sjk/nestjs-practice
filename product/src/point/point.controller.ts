import { Body, Controller, Get, Post } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';
import { ResponseEntity } from './../common/response-entity';
import { PointPurchaseRequest } from './dto/point-purchase.request';
import { PointService } from './point.service';

@Controller('point')
export class PointController {
  constructor(private readonly pointService: PointService) {}

  @Roles(Role.USER)
  @Get('history')
  async findHistory(@Body('userId') userId: number) {
    try {
      const histories = await this.pointService.findHistory(userId);
      return ResponseEntity.OK(histories);
    } catch (err) {
      return ResponseEntity.ERROR(err.message);
    }
  }

  @Roles(Role.USER)
  @Post('purchase')
  async purchase(@Body() request: PointPurchaseRequest) {
    try {
      await this.pointService.addPointByPurchase(request.userId, request.value);
      return ResponseEntity.OK();
    } catch (err) {
      return ResponseEntity.ERROR(err.message);
    }
  }
}
