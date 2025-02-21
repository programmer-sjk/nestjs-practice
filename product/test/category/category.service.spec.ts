import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../../src/category/category.module';
import { CategoryRepository } from '../../src/category/category.repository';
import { CategoryService } from '../../src/category/category.service';
import { CategoryRegisterRequest } from '../../src/category/dto/category-register.request';
import { Category } from '../../src/category/entities/category.entity';
import { testConnectionOptions } from '../test-ormconfig';

describe('CategoryService', () => {
  let module: TestingModule;
  let service: CategoryService;
  let repository: CategoryRepository;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(testConnectionOptions), CategoryModule],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repository = module.get<CategoryRepository>(CategoryRepository);
  });

  beforeEach(async () => {
    await repository.clear();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneById', () => {
    it('id로 카테고리를 조회할 수 있다.', async () => {
      // given
      const category = await repository.save(Category.of('의류'));

      // when
      const result = await service.findOneById(category.id);

      // then
      expect(result.name).toBe('의류');
    });
  });

  describe('addCategory', () => {
    it('카테고리를 추가할 수 있다.', async () => {
      // given
      const dto = new CategoryRegisterRequest();
      dto.name = '의류';

      // when
      await service.addCategory(dto);

      // then
      const result = await repository.find();
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('의류');
    });
  });
});
