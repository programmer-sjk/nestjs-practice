import { S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SignUpRequest } from './dto/sign-up.request';
import { UserProfileRepository } from './repositories/user-profile.repository';
import { UserRepository } from './repositories/user.repository';
@Injectable()
export class UserService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly userProfileRepository: UserProfileRepository,
  ) {
    this.bucketName = this.configService.get('AWS_BUCKET_NAME') ?? '';
    this.s3Client = new S3Client({
      region: 'ap-northeast-2',
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY') ?? '',
        secretAccessKey: this.configService.get('AWS_SECRET_KEY') ?? '',
      },
    });
  }

  async signUp(dto: SignUpRequest) {
    return this.userRepository.save(dto.toEntity());
  }

  async uploadProfile(body: Express.Multer.File) {
    // 1. 파일 업로드
    // 2. db 저장
  }
}
