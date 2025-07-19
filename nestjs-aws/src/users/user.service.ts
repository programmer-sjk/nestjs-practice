import { Injectable } from '@nestjs/common';
import { UploadService } from '../upload/upload.service';
import { SignUpRequest } from './dto/sign-up.request';
import { UserProfileRepository } from './repositories/user-profile.repository';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly uploadService: UploadService,
    private readonly userRepository: UserRepository,
    private readonly userProfileRepository: UserProfileRepository,
  ) {}

  async signUp(dto: SignUpRequest) {
    return this.userRepository.save(dto.toEntity());
  }

  async uploadProfile(userId: number, file: Express.Multer.File) {
    const imagePath = await this.uploadService.uploadProfile(userId, file);
    await this.userProfileRepository.save({ userId, path: imagePath });
    return { imagePath };
  }
}
