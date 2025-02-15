import { Body, Controller, Post } from '@nestjs/common';
import { ResponseEntity } from '../common/response-entity';
import { AdminService } from './admin.service';
import { AdminSignUpRequest } from './dto/admin-sign-up.request';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async adminSignUp(@Body() request: AdminSignUpRequest) {
    await this.adminService.addAdmin(request);
    return ResponseEntity.OK();
  }
}
