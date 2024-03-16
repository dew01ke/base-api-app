import { Controller, Get, Logger, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { ExampleService } from './example.service';

import { Config } from '@/config';
import { NoCache } from '@/core/interceptors/cache.interceptor';
import { Response } from '@/core/transformers/Response';
import { GetExampleRequest } from '@/dtos/example.request.dto';
import { ExampleResponse } from '@/dtos/example.response.dto';
import { routes } from '@/infrastructure/configs/routes';

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

        return new ExampleResponse('test', this.exampleService.decorateNumber(params.count));
    }
}
