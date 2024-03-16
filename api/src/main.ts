import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from "@nestjs/platform-express";
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import helmet from 'helmet';
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

function useSwagger(app: NestExpressApplication) {
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
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: getLogger()
    });
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
}

bootstrap();
