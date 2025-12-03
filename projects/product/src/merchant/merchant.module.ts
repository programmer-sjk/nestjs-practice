import { Module } from '@nestjs/common';
import { MerchantService } from './application/services/merchant.service';
import { MerchantRepository } from './infrastructure/persistence/merchant.repository';
import { MerchantController } from './presentation/merchant.controller';

@Module({
  providers: [
    MerchantService,
    {
      provide: 'IMerchantRepository',
      useClass: MerchantRepository,
    },
  ],
  controllers: [MerchantController],
})
export class MerchantModule {}
