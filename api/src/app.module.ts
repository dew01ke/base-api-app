import { Module, CacheModule } from '@nestjs/common';
import { TypedConfigModule, dotenvLoader } from 'nest-typed-config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ExampleModule } from '@/modules/example/example.module';
import { Config } from '@/config';
import { CacheInterceptor } from '@/core/interceptors/cache.interceptor';

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
export class AppModule {}
