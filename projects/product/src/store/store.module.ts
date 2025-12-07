import { Module } from '@nestjs/common';
import { StoreService } from './application/services/store.service';
import { StoreController } from './presentation/store.controller';

@Module({
  providers: [StoreService],
  controllers: [StoreController]
})
export class StoreModule {}
