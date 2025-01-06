import { BadRequestException } from '@nestjs/common';
import { CreateType } from '../enums/create-type.enum';
import { HashUrl } from './hash-url';
import { SnowFlake } from './snow-flake';

export class UrlFactory {
  private constructor() {}

  static of(type: CreateType) {
    switch (type) {
      case CreateType.HASH:
        return new HashUrl();
      case CreateType.SNOW_FLAKE:
        return new SnowFlake();
      default:
        throw new BadRequestException('허용하지 않는 생성 타입입니다.');
    }
  }
}
