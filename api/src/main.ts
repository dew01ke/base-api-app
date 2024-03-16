import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from '@/app.module';
import { Config } from '@/config';

function useSwagger(app: INestApplication) {
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
