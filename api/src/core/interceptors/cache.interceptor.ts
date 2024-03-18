import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Inject,
    SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Cache } from 'cache-manager';
import { FastifyRequest } from 'fastify';
import { Observable, of, map } from 'rxjs';

import { Config } from '@/config';

enum CacheProperties {
    CACHE_TTL = 'CACHE_TTL',
    NO_CACHE = 'NO_CACHE',
}

export const CacheTTL = (ttl: number) => SetMetadata(CacheProperties.CACHE_TTL, ttl);
export const NoCache = () => SetMetadata(CacheProperties.NO_CACHE, true);

@Injectable()
export class CacheInterceptor implements NestInterceptor {
    public constructor(
        private readonly config: Config,
        private readonly reflector: Reflector,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) {
    }

    private buildCacheKey(context: ExecutionContext): string {
        const request = context.switchToHttp().getRequest<FastifyRequest>();

        return `${request.url}`;
    }

    public async intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Promise<Observable<unknown>> {
        const noCache = this.reflector.get(
            CacheProperties.NO_CACHE,
            context.getHandler(),
        );
        const isGetRequest = context.switchToHttp().getRequest<FastifyRequest>().method === 'GET';

        if (noCache || !isGetRequest) {
            return next.handle();
        }

        const ttl = this.reflector.get(CacheProperties.CACHE_TTL, context.getHandler())
            || this.config.CACHE_TTL;
        const cacheKey = this.buildCacheKey(context);
        const cacheData = await this.cacheManager.get(cacheKey);

        if (cacheData) {
            return of(cacheData);
        }

        return next.handle().pipe(
            map(async (data: unknown) => {
                await this.cacheManager.set(cacheKey, data, ttl);

                return data;
            }),
        );
    }
}
