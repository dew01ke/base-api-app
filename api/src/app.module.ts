import { CacheModule } from '@nestjs/cache-manager';
import { Module, MiddlewareConsumer, Logger } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypedConfigModule, dotenvLoader } from 'nest-typed-config';

import { Config } from '@/config';
import { CacheInterceptor } from '@/core/interceptors/cache.interceptor';
import { RequestInterceptor } from '@/core/interceptors/request.interceptor';
import { ExampleMiddleware } from '@/middlewares/example.middleware';
import { ExampleModule } from '@/modules/example/example.module';

@Module({
    imports: [
        CacheModule.register(),
        TypedConfigModule.forRoot({
            isGlobal: true,
            schema: Config,
            load: dotenvLoader(),
        }),
        ExampleModule,
    ],
    controllers: [],
    providers: [
        Logger,
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: RequestInterceptor,
        },
    ],
})
export class AppModule {
    private configure(consumer: MiddlewareConsumer) {
        consumer.apply(ExampleMiddleware).forRoutes('*');
    }
}
