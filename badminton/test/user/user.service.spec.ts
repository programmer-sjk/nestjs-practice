import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignUpRequest } from '../../src/user/dto/sign-up.request';
import { UserModule } from '../../src/user/user.module';
import { UserRepository } from '../../src/user/user.repository';
import { UserService } from '../../src/user/user.service';
import { TestUserCreator } from '../fixture/entity/test-user-creator';
import { testConnectionOptions } from '../test-ormconfig';

describe('UserService', () => {
  let module: TestingModule;
  let service: UserService;
  let userRepository: UserRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testConnectionOptions), UserModule],
    }).compile();

    service = module.get<UserService>(UserService);
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

  describe('findUserByEmailOrThrow', () => {
    it('email로 사용자를 조회할 수 있다.', async () => {
      // given
      const email = 'test@test.com';
      const user = await userRepository.save(
        TestUserCreator.of(email, 'password'),
      );

      // when
      const findUser = await service.findUserByEmailOrThrow(email);

      // then
      expect(findUser.id).toBe(user.id);
      expect(findUser.email).toBe(user.email);
    });
  });

  it('email로 사용자를 찾지 못하면 에외가 발생한다.', async () => {
    // when & then
    await expect(service.findUserByEmailOrThrow('email')).rejects.toThrow(
      new NotFoundException('등록되지 않은 사용자입니다.'),
    );
  });

  describe('addUser', () => {
    it('사용자를 등록할 수 있다.', async () => {
      // given
      const dto = new SignUpRequest();
      dto.name = 'name';
      dto.email = 'test@test.com';
      dto.password = 'password';

      // when
      await service.addUser(dto);

      // then
      const user = await userRepository.find();
      expect(user[0].name).toBe(dto.name);
      expect(user[0].email).toBe(dto.email);
      expect(user[0].password).toBeTruthy();
    });
  });
});
