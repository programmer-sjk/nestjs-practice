import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseEntity } from '../../common/response-entity';
import { MutationResponseSchema } from '../../common/swagger/response-schema';
import { MerchantSignUpRequest } from '../application/dto/merchant-signup.request';
import { MerchantService } from '../application/services/merchant.service';

@ApiTags('merchants')
@ApiExtraModels(ResponseEntity)
@Controller('merchants')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @ApiOperation({ summary: '상점 관리자 회원가입' })
  @ApiResponse(MutationResponseSchema)
  @Post()
  async signUp(@Body() request: MerchantSignUpRequest) {
    await this.merchantService.signUp(request);
    return ResponseEntity.OK();
  }
}
