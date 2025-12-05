import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseEntity } from '../../common/response-entity';
import { MutationResponseSchema } from '../../common/swagger/response-schema';
import { MerchantLoginRequest } from '../application/dto/merchant-login.request';
import { AuthService } from '../application/services/auth.service';

@ApiTags('auth')
@ApiExtraModels(ResponseEntity)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '상점 관리자 로그인' })
  @ApiResponse(MutationResponseSchema)
  @Post('merchant/login')
  async login(@Body() request: MerchantLoginRequest) {
    await this.authService.login(request);
    return ResponseEntity.OK();
  }
}
