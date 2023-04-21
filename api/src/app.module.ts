import { Module, MiddlewareConsumer } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { TypedConfigModule, dotenvLoader } from 'nest-typed-config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ExampleModule } from '@/modules/example/example.module';
import { Config } from '@/config';
import { CacheInterceptor } from '@/core/interceptors/cache.interceptor';
import { RequestMiddleware } from '@/middlewares/request.middleware';

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
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestMiddleware).forRoutes('*');
  }
}
