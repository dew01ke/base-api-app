import { NestFactory } from '@nestjs/core';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import helmet from 'helmet';
import { Request } from 'express';
import { Config } from '@/config';
import { AppModule } from '@/app.module';

const url = require('url');

function validateCorsOrigin(allowedHosts: string[]) {
  return (request: Request, callback) => {
    const originUrl = url.parse(request.get('origin') || '');
    const isSelfHost = originUrl.hostname === request.hostname;
    const isAllowedHost = allowedHosts.includes(originUrl.hostname);

    if (!originUrl.hostname || isSelfHost || isAllowedHost) {
      callback(null, true);
    } else {
      callback(new HttpException(null, HttpStatus.FORBIDDEN));
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
