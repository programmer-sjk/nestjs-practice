import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Role } from '../../auth/domain/enums/role.enum';
import { Roles } from '../../auth/infrastructure/decorators/roles.decorator';
import { ResponseEntity } from '../../common/response-entity';
import { MutationResponseSchema } from '../../common/swagger/response-schema';
import { StoreRegisterRequest } from '../application/dto/store-register.request';
import { StoreService } from '../application/services/store.service';

@Roles([Role.MERCHANT])
@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @ApiOperation({ summary: '상점 등록' })
  @ApiResponse(MutationResponseSchema)
  @Post()
  async register(@Body() request: StoreRegisterRequest, @Req() req: Request) {
    await this.storeService.register(req['merchantId'], request);
    return ResponseEntity.OK();
  }
}
