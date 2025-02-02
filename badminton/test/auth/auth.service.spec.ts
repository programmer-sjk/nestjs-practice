import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../../src/auth/auth.service';
import { SignInRequest } from '../../src/auth/dto/sigin-in.request';
import { hash } from '../../src/common/bcrypt';
import { UserRepository } from '../../src/user/user.repository';
import { UserService } from '../../src/user/user.service';
import { TestUserCreator } from '../fixture/entity/test-user-creator';
import { testConnectionOptions } from './../test-ormconfig';

describe('AuthService', () => {
  let module: TestingModule;
  let service: AuthService;
  let jwtService: JwtService;
  let userService: UserService;
  let userRepository: UserRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testConnectionOptions)],
      providers: [
        AuthService,
        JwtService,
        ConfigService,
        UserService,
        UserRepository,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  afterAll(async () => {
    await module.close();
  });

  beforeEach(async () => {
    await userRepository.clear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('email과 password가 일치하면 access_token을 발급한다.', async () => {
      // given
      const hashed = hash('password');
      const user = TestUserCreator.of('test@test.com', hashed);
      await userRepository.save(user);

      const dto = new SignInRequest();
      dto.email = 'test@test.com';
      dto.password = 'password';

      jest
        .spyOn(jwtService, 'signAsync')
        .mockResolvedValue(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTczODQ1Nzc2NCwiZXhwIjoxNzM4NDU4MzY0fQ.DZRk7vzYSihhuGbGZai9ox3jwkLrsH3-AtmWtNKs0uU',
        );

      // when
      const result = await service.signIn(dto);

      // then
      expect(result.accessToken).toBe(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTczODQ1Nzc2NCwiZXhwIjoxNzM4NDU4MzY0fQ.DZRk7vzYSihhuGbGZai9ox3jwkLrsH3-AtmWtNKs0uU',
      );
    });

    it('email과 password가 일치하지 않으면 Unauthorized 예외가 발생한다.', async () => {
      // given
      const hashed = hash('password');
      const user = TestUserCreator.of('test@test.com', hashed);
      await userRepository.save(user);

      const dto = new SignInRequest();
      dto.email = 'test@test.com';
      dto.password = 'fail';

      // when & then
      await expect(service.signIn(dto)).rejects.toThrow(UnauthorizedException);
    });
  });
});
