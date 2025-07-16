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
  private readonly region = 'us-east-1';
  private readonly directory = 'local-upload-test';

  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly userProfileRepository: UserProfileRepository,
  ) {
    this.bucketName = this.configService.get('AWS_BUCKET_NAME') ?? '';
    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY') ?? '',
        secretAccessKey: this.configService.get('AWS_SECRET_KEY') ?? '',
      },
    });
  }

  async signUp(dto: SignUpRequest) {
    return this.userRepository.save(dto.toEntity());
  }

  async uploadProfile(file: Express.Multer.File) {
    const key = `${this.directory}/${Date.now()}-profile`;
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    try {
      const result = await this.s3Client.send(command);
      const imagePath = `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`;
      console.log(imagePath);
      // 2. db 저장
      // 여기서 userProfileRepository에 파일 URL 저장
      // await this.userProfileRepository.save({ userId, profileUrl: fileUrl });

      console.log(result);

      return { imagePath };
    } catch (error) {
      console.error('S3 업로드 에러:', error);
      throw new Error('파일 업로드에 실패했습니다.');
    }
  }
}
