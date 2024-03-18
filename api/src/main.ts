import helmet from '@fastify/helmet';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import { createLogger, transports } from 'winston';

import { AppModule } from '@/app.module';
import { Config } from '@/config';

const getLogger = () => {
    const logger = createLogger({
        transports: [
            new transports.Console()
        ]
    });

    return WinstonModule.createLogger({
        instance: logger
    });
}

const useSwagger = (app: NestFastifyApplication) => {
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
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
        {
            logger: getLogger()
        }
    );
    const config = app.get(Config);

    if (config.API_PREFIX) {
        app.setGlobalPrefix(config.API_PREFIX);
    }

    await app.register(helmet);

    app.enableCors({
        origin: config.CORS_ORIGIN,
        methods: config.CORS_METHODS,
        allowedHeaders: config.CORS_ALLOWED_HEADERS,
    })
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );
    useSwagger(app);

    await app.listen(config.APP_PORT, config.APP_HOST);
}

bootstrap();
