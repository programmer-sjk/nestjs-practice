import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { RedisService } from './redis.service';

@Injectable()
export class CacheRegister implements OnModuleInit {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector,
    private readonly redisService: RedisService,
  ) {}

  onModuleInit() {
    return this.discoveryService
      .getProviders() // #1. 모든 provider 조회
      .filter((wrapper) => wrapper.isDependencyTreeStatic())
      .filter(({ instance }) => instance && Object.getPrototypeOf(instance))
      .forEach(({ instance }) => {
        // const r = this.metadataScanner.getAllMethodNames(instance);
        // console.log(r);
        
        // this.metadataScanner.scanFromPrototype(
        //   instance,
        //   Object.getPrototypeOf(instance),
        //   (methodName) => {
        //     const cacheOptions = this.reflector.get(
        //       CACHEABLE_KEY,
        //       instance[methodName],
        //     );
        //     if (!cacheOptions) {
        //       return;
        //     }
        //     const methodRef = instance[methodName];
        //     instance[methodName] = async function (...args: any[]) {
        //       const cacheKey = CacheRegister.isIdentifier(args)
        //         ? `${cacheOptions.key}:${args[0]}`
        //         : cacheOptions.key;
        //       const cached = await this.redisService.get(cacheKey);
        //       if (cached) {
        //         console.log('cached', cached);
        //       }
        //       console.log(this.redisService);
        //       // const result = await methodRef.call(instance, ...args);
        //       // await this.redisService.set(cacheKey, result,)
        //       console.log(cacheKey);
        //       console.log(cacheOptions, instance[methodName]);
        //     };
        //   },
        // );
      });
  }

  static isIdentifier(args) {
    return args.length === 1 && typeof args[0] === 'number';
  }
}
