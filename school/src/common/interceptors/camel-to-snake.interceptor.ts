import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import snakecaseKeys from 'snakecase-keys';

@Injectable()
export class CamelToSnakeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next
      .handle()
      .pipe(
        map((data: unknown) =>
          snakecaseKeys(data as Record<string, unknown>, { deep: true }),
        ),
      );
  }
}
