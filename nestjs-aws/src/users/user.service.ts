import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
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

  async uploadProfile(
    file: Express.Multer.File,
    userId?: string,
    directory?: string,
  ) {
    // 1. 파일 업로드
    const timestamp = Date.now();

    // 디렉토리 경로 설정 (여러 가지 방법)
    let key: string;

    if (directory) {
      // 특정 디렉토리가 지정된 경우
      key = `${directory}/${timestamp}-${file.originalname}`;
    } else if (userId) {
      // 사용자별 디렉토리
      key = `profiles/${userId}/${timestamp}-${file.originalname}`;
    } else {
      // 기본 profiles 디렉토리
      key = `profiles/${timestamp}-${file.originalname}`;
    }

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    try {
      const result = await this.s3Client.send(command);
      const fileUrl = `https://${this.bucketName}.s3.ap-northeast-2.amazonaws.com/${key}`;

      // 2. db 저장
      // 여기서 userProfileRepository에 파일 URL 저장
      // await this.userProfileRepository.save({ userId, profileUrl: fileUrl });

      return {
        success: true,
        fileUrl,
        key,
        result,
      };
    } catch (error) {
      console.error('S3 업로드 에러:', error);
      throw new Error('파일 업로드에 실패했습니다.');
    }
  }
}
