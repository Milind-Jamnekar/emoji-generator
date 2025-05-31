import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BrowserInterceptor implements NestInterceptor {
  logger = new Logger(BrowserInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const userAgent = request.header('user-agent') || 'unknown';
    request.header.browser = userAgent;

    this.logger.debug(`Request from browser: ${userAgent}`);

    return next.handle();
  }
}
