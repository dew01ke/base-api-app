import { CacheModule } from '@nestjs/cache-manager';
import { Module, MiddlewareConsumer, Logger } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypedConfigModule, dotenvLoader } from 'nest-typed-config';

import { Config } from '@/configs/app.config';
import { CacheInterceptor } from '@/lib/interceptors/cache.interceptor';
import { RequestInterceptor } from '@/lib/interceptors/request.interceptor';
import { ExampleMiddleware } from '@/lib/middlewares/example.middleware';
import { ExampleModule } from '@/modules/example-module/example.module';

const APPLICATION_MODULES = [
    ExampleModule,
];

@Module({
    imports: [
        CacheModule.register(),
        TypedConfigModule.forRoot({
            isGlobal: true,
            schema: Config,
            load: dotenvLoader(),
        }),
        ...APPLICATION_MODULES
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
