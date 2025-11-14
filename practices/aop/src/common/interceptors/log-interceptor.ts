import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LogInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    this.logger.log(
      `request method: ${req.method}, url: ${req.url}, body: ${JSON.stringify(
        req.body,
      )}`,
    );

    const now = Date.now();
    return next.handle().pipe(
      map((data) => {
        this.logger.log(
          `response totalTime: ${Date.now() - now}ms, data=${JSON.stringify(
            data,
          )}`,
        );
        return data;
      }),
    );
  }
}
