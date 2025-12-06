import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MerchantModule } from '../merchant/merchant.module';
import { AuthService } from './application/services/auth.service';
import { AuthGuard } from './infrastructure/guards/auth.guard';

@Module({
  imports: [JwtModule.register({}), MerchantModule],
  providers: [AuthGuard, AuthService],
})
export class AuthModule {}
