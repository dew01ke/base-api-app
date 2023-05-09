import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import helmet from 'helmet';
import { Request } from 'express';
import { Config } from '@/config';
import { AppModule } from '@/app.module';

function validateCorsOrigin(allowedHosts: string[]) {
  return (request: Request, callback) => {
    if (allowedHosts.includes(request.hostname)) {
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

  if (config.API_PREFIX) {
    app.setGlobalPrefix(config.API_PREFIX);
  }

  app.use(helmet());
  app.enableCors(validateCorsOrigin(config.ALLOWED_HOSTS));
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
