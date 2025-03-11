import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { connectionOptions } from '../ormconfig';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/guards/auth.guard';
import { CategoryModule } from './category/category.module';
import { CouponModule } from './coupon/coupon.module';
import { OrderModule } from './order/order.module';
import { PointModule } from './point/point.module';
import { ProductModule } from './product/product.module';
import { RedisModule } from './redis/redis.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return connectionOptions;
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passedd');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    UserModule,
    AdminModule,
    ProductModule,
    OrderModule,
    PointModule,
    CouponModule,
    AuthModule,
    CategoryModule,
    ConfigModule,
    JwtModule,
    RedisModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
