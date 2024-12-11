import { RedisModule as IORedisModule } from '@nestjs-modules/ioredis';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';
import { RedisService } from '../../src/redis/redis.service';

describe('RedisService', () => {
  let module: TestingModule;
  let service: RedisService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        IORedisModule.forRoot({
          type: 'single',
          url: 'localhost',
        }),
      ],
      providers: [
        RedisService,
        { provide: CACHE_MANAGER, useFactory: jest.fn() },
      ],
    }).compile();

    service = module.get<RedisService>(RedisService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
