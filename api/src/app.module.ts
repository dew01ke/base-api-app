import { CacheModule } from '@nestjs/cache-manager';
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypedConfigModule, dotenvLoader } from 'nest-typed-config';

import { Config } from '@/config';
import { CacheInterceptor } from '@/core/interceptors/cache.interceptor';
import { RequestMiddleware } from '@/middlewares/request.middleware';
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
        {
            provide: APP_INTERCEPTOR,
            useClass: CacheInterceptor,
        },
    ],
})
export class AppModule {
    private configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestMiddleware).forRoutes('*');
    }
}
