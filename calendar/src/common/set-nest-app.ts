import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export function setNestApp(app: INestApplication) {
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('v1');
}
