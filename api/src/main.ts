import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import helmet from 'helmet';
import { Config } from '@/config';
import { AppModule } from '@/app.module';

function validateCorsOrigin(corsOrigin: string) {
  return (origin, callback) => {
    if (!origin || corsOrigin.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('This origin is not allowed'));
    }
  };
}

function useSwagger(app) {
  const config = new DocumentBuilder().build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  SwaggerModule.setup(
    'docs',
    app,
    SwaggerModule.createDocument(app, config, options),
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(Config);
  app.setGlobalPrefix('api');

  app.use(helmet());
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  useSwagger(app);

  await app.listen(config.APP_PORT, config.APP_HOST);

  console.log('Application is running on:', await app.getUrl());
}
bootstrap();
