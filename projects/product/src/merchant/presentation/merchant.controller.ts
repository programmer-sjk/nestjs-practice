import { Body, Controller, Post } from '@nestjs/common';
import { MerchantService } from '../application/services/merchant.service';
import { ResponseEntity } from '../../common/response-entity';
import { MerchantSignUpRequest } from '../application/dto/merchant-signup.request';

@Controller('merchant')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @Post()
  async signUp(@Body() request: MerchantSignUpRequest) {
    await this.merchantService.signUp(request);
    return ResponseEntity.OK();
  }
}
