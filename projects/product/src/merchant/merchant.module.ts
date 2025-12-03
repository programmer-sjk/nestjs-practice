import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MerchantService } from './application/services/merchant.service';
import { Merchant } from './domain/entities/merchant.entity';
import { MerchantRepository } from './infrastructure/persistence/merchant.repository';
import { MerchantController } from './presentation/merchant.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Merchant])],
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
