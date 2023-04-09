import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
  SetMetadata,
  CACHE_MANAGER,
} from '@nestjs/common';
import { Request } from 'express';
import { Cache } from 'cache-manager';
import { Observable, of, map } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Config } from '@/config';

enum CacheProperties {
  CACHE_TTL = 'CACHE_TTL',
  CACHE_BY_USER = 'CACHE_BY_USER',
  NO_CACHE = 'NO_CACHE',
}

export const CacheTTL = (ttl: number) => SetMetadata(CacheProperties.CACHE_TTL, ttl);
export const NoCache = () => SetMetadata(CacheProperties.NO_CACHE, true);

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(
    private readonly config: Config,
    private readonly reflector: Reflector,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  private generateKey(context: ExecutionContext): string {
    const request = context.switchToHttp().getRequest<Request>();

    return `${request.url}`;
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const noCache = this.reflector.get(
      CacheProperties.NO_CACHE,
      context.getHandler(),
    );
    const skipCache = context.switchToHttp().getRequest<Request>().method !== 'GET';

    if (noCache || skipCache) {
      return next.handle();
    }

    const ttl = this.reflector.get(CacheProperties.CACHE_TTL, context.getHandler())
      || this.config.CACHE_TTL;
    const key = this.generateKey(context);
    const cached = await this.cacheManager.get(key);

    if (cached) {
      return of(cached);
    }

    return next.handle().pipe(
      map(async (data) => {
        await this.cacheManager.set(key, data, ttl);

        return data;
      }),
    );
  }
}
