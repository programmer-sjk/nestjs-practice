import { BadRequestException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from '../../src/admin/admin.module';
import { AdminRepository } from '../../src/admin/admin.repository';
import { AuthModule } from '../../src/auth/auth.module';
import { AuthService } from '../../src/auth/auth.service';
import { SignInRequest } from '../../src/auth/dto/sign-in.request';
import { UserModule } from '../../src/user/user.module';
import { UserRepository } from '../../src/user/user.repository';
import { AdminFactory } from '../fixture/entities/admin-factory';
import { UserFactory } from '../fixture/entities/user-factory';
import { testConnectionOptions } from '../test-ormconfig';

describe('AuthService', () => {
  let module: TestingModule;
  let service: AuthService;
  let jwtService: JwtService;
  let configService: ConfigService;
  let userRepository: UserRepository;
  let adminRepository: AdminRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(testConnectionOptions),
        UserModule,
        AdminModule,
        AuthModule,
        JwtModule,
        ConfigModule.forRoot(),
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
    userRepository = module.get<UserRepository>(UserRepository);
    adminRepository = module.get<AdminRepository>(AdminRepository);
  });

  beforeEach(async () => {
    await userRepository.clear();
    await adminRepository.clear();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('로그인을 성공하면 accessToken을 발급받는다.', async () => {
      // given
      const email = 'test@gmail.com';
      const password = 'password';
      await userRepository.save(UserFactory.from(email, password));

      const dto = new SignInRequest();
      dto.email = email;
      dto.password = password;

      jest
        .spyOn(jwtService, 'signAsync')
        .mockResolvedValueOnce(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTczODQ1Nzc2NCwiZXhwIjoxNzM4NDU4MzY0fQ.DZRk7vzYSihhuGbGZai9ox3jwkLrsH3-AtmWtNKs0uU',
        );

      // when
      const result = await service.signIn(dto);

      // then
      expect(result.accessToken).toBe(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTczODQ1Nzc2NCwiZXhwIjoxNzM4NDU4MzY0fQ.DZRk7vzYSihhuGbGZai9ox3jwkLrsH3-AtmWtNKs0uU',
      );
    });

    it('로그인 성공 후 발급받는 accessToken의 sub는 사용자 ID이다.', async () => {
      // given
      const email = 'test@gmail.com';
      const password = 'password';
      const user = await userRepository.save(UserFactory.from(email, password));

      const dto = new SignInRequest();
      dto.email = email;
      dto.password = password;

      // when
      const result = await service.signIn(dto);

      // then
      const payload = await jwtService.verifyAsync(result.accessToken, {
        secret: configService.get<string>('SECRET_KEY'),
      });
      expect(payload.sub).toBe(user.id);
    });

    it('로그인을 실패하면 accessToken을 받급받지 못한다.', async () => {
      // given
      const email = 'test@gmail.com';
      const password = 'password';
      await userRepository.save(UserFactory.from(email, password));

      const dto = new SignInRequest();
      dto.email = email;
      dto.password = 'wrongPassword';

      // when & then
      await expect(service.signIn(dto)).rejects.toThrow(
        new BadRequestException('계정 정보가 일치하지 않습니다.'),
      );
    });
  });

  describe('adminSignIn', () => {
    it('어드민 로그인을 성공하면 accessToken을 발급받는다.', async () => {
      // given
      const email = 'test@gmail.com';
      const password = 'password';
      await adminRepository.save(AdminFactory.from(email, password));

      const dto = new SignInRequest();
      dto.email = email;
      dto.password = password;

      jest
        .spyOn(jwtService, 'signAsync')
        .mockResolvedValueOnce(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTczODQ1Nzc2NCwiZXhwIjoxNzM4NDU4MzY0fQ.DZRk7vzYSihhuGbGZai9ox3jwkLrsH3-AtmWtNKs0uU',
        );

      // when
      const result = await service.adminSignIn(dto);

      // then
      expect(result.accessToken).toBe(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTczODQ1Nzc2NCwiZXhwIjoxNzM4NDU4MzY0fQ.DZRk7vzYSihhuGbGZai9ox3jwkLrsH3-AtmWtNKs0uU',
      );
    });

    it('어드민 로그인 성공 후 발급받는 accessToken의 sub는 어드민 ID이다.', async () => {
      // given
      const email = 'test@gmail.com';
      const password = 'password';
      const admin = await adminRepository.save(
        AdminFactory.from(email, password),
      );

      const dto = new SignInRequest();
      dto.email = email;
      dto.password = password;

      // when
      const result = await service.adminSignIn(dto);

      // then
      const payload = await jwtService.verifyAsync(result.accessToken, {
        secret: configService.get<string>('SECRET_KEY'),
      });
      expect(payload.sub).toBe(admin.id);
    });

    it('로그인을 실패하면 accessToken을 받급받지 못한다.', async () => {
      // given
      const email = 'test@gmail.com';
      const password = 'password';
      await adminRepository.save(AdminFactory.from(email, password));

      const dto = new SignInRequest();
      dto.email = email;
      dto.password = 'wrongPassword';

      // when & then
      await expect(service.adminSignIn(dto)).rejects.toThrow(
        new BadRequestException('계정 정보가 일치하지 않습니다.'),
      );
    });
  });
});
