import { Controller, Get, Logger, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { ExampleService } from '../services/example.service';

import { Config } from '@/configs/app.config';
import { routes } from '@/configs/app.routes';
import { NoCache } from '@/lib/interceptors/cache.interceptor';
import { Response } from '@/lib/transformers/Response';
import { GetExampleRequest } from '@/modules/example/dtos/example.request.dto';
import { ExampleResponse } from '@/modules/example/dtos/example.response.dto';

@Controller()
export class ExampleController {
    public constructor(
        private readonly config: Config,
        private readonly logger: Logger,
        private readonly exampleService: ExampleService,
    ) {
    }

    @Get(routes.example.cached)
    @ApiResponse({ status: 200, type: Response })
    private cached(
        @Query() params: GetExampleRequest,
    ) {
        this.logger.log('cached hit');

        return `cached_${Math.random()}_${params.count}`;
    }

    @Get(routes.example.random)
    @NoCache()
    @ApiResponse({ status: 200, type: Response })
    private random(
        @Query() params: GetExampleRequest,
    ) {
        this.logger.log('random hit');

        const randomString = String(Math.random());
        const decoratedCount = this.exampleService.decorateNumber(params.count);

        return new ExampleResponse(randomString, decoratedCount);
    }
}
