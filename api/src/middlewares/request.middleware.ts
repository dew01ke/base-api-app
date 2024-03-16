import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { Config } from '@/config';

@Injectable()
export class RequestMiddleware implements NestMiddleware<Request, Response> {
    public constructor(
        private readonly config: Config,
        private readonly logger: Logger
    ) {
    }

    public use(
        request: Request,
        response: Response,
        next: NextFunction,
    ) {
        const { ip, method, path: url } = request;
        const userAgent = request.get('user-agent') || '';

        response.once('close', () => {
            const { statusCode } = response;

            this.logger.log(`[${method}] [${statusCode}] [${ip}] ${url} (${userAgent})`);
        });

        next();
    }
}
