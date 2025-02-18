import { Module } from '@nestjs/common';
import { CouponModule } from '../coupon/coupon.module';
import { PointModule } from '../point/point.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  imports: [CouponModule, PointModule],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
