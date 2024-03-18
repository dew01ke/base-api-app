import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler, Logger
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Observable, tap } from 'rxjs';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
    public constructor(
        private readonly logger: Logger,
    ) {
    }

    public intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<unknown> {
        return next
            .handle()
            .pipe(tap(() => {
                const request = context.switchToHttp().getRequest<FastifyRequest>();
                const response = context.switchToHttp().getResponse<FastifyReply>();
                const { method, url, ip } = request;
                const userAgent = request.headers['user-agent'] || '';
                const { statusCode, elapsedTime } = response;

                this.logger.log(`[${method}] [${statusCode}] [${elapsedTime}ms] [${ip}] ${url} [${userAgent}]`);
            }));
    }
}
