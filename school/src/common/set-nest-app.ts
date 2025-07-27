import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CamelToSnakeInterceptor } from './interceptors/camel-to-snake.interceptor';
import { SnakeToCamelPipe } from './pipes/snake-to-camel.pipe';

export function setNestApp(app: INestApplication) {
  app.useGlobalInterceptors(
    new CamelToSnakeInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  app.useGlobalPipes(
    new SnakeToCamelPipe(),
    new ValidationPipe({ transform: true }),
  );
  app.setGlobalPrefix('/v1');
}
