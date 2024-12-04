import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { setNestApp } from './common/set-nest-app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setNestApp(app);
  initializeSwagger(app);
  await app.listen(3000);
}

function initializeSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('API example')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
}

bootstrap();
