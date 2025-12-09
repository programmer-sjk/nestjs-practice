import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreService } from './application/services/store.service';
import { Store } from './domain/entities/store.entity';
import { StoreRepository } from './infrastructure/persistence/store.repository';
import { StoreController } from './presentation/store.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Store])],
  providers: [
    StoreService,
    {
      provide: 'IStoreRepository',
      useClass: StoreRepository,
    },
  ],
  controllers: [StoreController],
})
export class StoreModule {}
