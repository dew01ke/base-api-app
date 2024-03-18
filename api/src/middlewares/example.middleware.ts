import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

import { Config } from '@/config';

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
    public constructor(
        private readonly config: Config,
        private readonly logger: Logger
    ) {
    }
    public use(
        request: FastifyRequest,
        response: FastifyReply,
        next: () => void
    ) {
        next();
    }
}
