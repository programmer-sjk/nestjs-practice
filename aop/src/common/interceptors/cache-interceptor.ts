import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { RedisService } from '../../redis/redis.service';

/**
 * 실무에서는 이렇게 하지 않지만, 굳이 인터셉트로 캐시를 적용해보는 예시
 */

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private readonly cacheKeyPrefix = 'user';

  constructor(private readonly redisService: RedisService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const userId = Number(req.params.id);
    const cacheKey = `${this.cacheKeyPrefix}-${userId}`;
    const cached = await this.redisService.get(cacheKey);

    if (cached) {
      return of(cached);
    }

    return next.handle().pipe(
      map(async (data) => {
        await this.redisService.set(cacheKey, data, 60 * 1000);
        return data;
      }),
    );
  }
}
