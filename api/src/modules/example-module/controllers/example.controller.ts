import { Controller, Get, Logger, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { ExampleRequestDto } from '../dtos/example.request.dto';
import { ExampleResponseDto } from '../dtos/example.response.dto';
import { ExampleService } from '../services/example.service';

import { Config } from '@/configs/app.config';
import { routes } from '@/configs/app.routes';
import { Response } from '@/lib/api';
import { NoCache } from '@/lib/interceptors/cache.interceptor';

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
        @Query() params: ExampleRequestDto,
    ) {
        this.logger.log('cached hit');

        const result = `cached_${Math.random()}_${params.count}`;

        return new Response(result);
    }

    @Get(routes.example.random)
    @NoCache()
    @ApiResponse({ status: 200, type: Response })
    private random(
        @Query() params: ExampleRequestDto,
    ) {
        this.logger.log('random hit');

        const randomString = String(Math.random());
        const decoratedCount = this.exampleService.decorateNumber(params.count);

        return new Response(new ExampleResponseDto(randomString, decoratedCount));
    }
}
