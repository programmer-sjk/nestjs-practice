import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminRepository } from './admin.repository';
import { AdminService } from './admin.service';

@Module({
  providers: [AdminService, AdminRepository],
  controllers: [AdminController],
})
export class AdminModule {}
