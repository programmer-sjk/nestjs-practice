import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { MerchantModule } from '../merchant/merchant.module';
import { AuthService } from './application/services/auth.service';
import { AuthGuard } from './infrastructure/guards/auth.guard';

@Module({
  imports: [JwtModule.register({}), MerchantModule],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
