import { Module } from '@nestjs/common';
import { MerchantService } from './application/services/merchant.service';
import { MerchantController } from './presentation/merchant.controller';

@Module({
  providers: [MerchantService],
  controllers: [MerchantController]
})
export class MerchantModule {}
