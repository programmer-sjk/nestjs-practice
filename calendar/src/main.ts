import { NestFactory } from '@nestjs/core';
import {
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional';
import { AppModule } from './app.module';
import { setNestApp } from './common/set-nest-app';

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });
  const app = await NestFactory.create(AppModule);
  setNestApp(app);
  await app.listen(3000);
}
bootstrap();
