import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { CACHEABLE_KEY } from '../common/decorators/cache-decorator';
import { RedisService } from './redis.service';

@Injectable()
export class RedisCacheRegister implements OnModuleInit {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector,
    private readonly redisService: RedisService,
  ) {}

  onModuleInit() {
    const isIdentifierRef = this.isIdentifier;
    const redisServiceRef = this.redisService;

    return this.discoveryService
      .getProviders()
      .filter((wrapper) => wrapper.isDependencyTreeStatic())
      .filter(({ instance }) => instance && Object.getPrototypeOf(instance))
      .forEach(({ instance }) => {
        this.metadataScanner
          .getAllMethodNames(instance)
          .forEach((methodName) => {
            const cacheOptions = this.reflector.get(
              CACHEABLE_KEY,
              instance[methodName],
            );

            if (!cacheOptions) {
              return;
            }

            const methodRef = instance[methodName];

            instance[methodName] = async function (...args: any[]) {
              const cacheKey = isIdentifierRef(args)
                ? `${cacheOptions.key}:${args[0]}`
                : cacheOptions.key;
              const cached = await redisServiceRef.get(cacheKey);
              if (cached) {
                console.log('cached!');
                return cached;
              }
              const result = await methodRef.call(instance, ...args);
              await redisServiceRef.set(cacheKey, result, cacheOptions.ttl);
              return result;
            };
          });
      });

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
  }

  isIdentifier(args) {
    return args.length === 1 && typeof args[0] === 'number';
  }
}
