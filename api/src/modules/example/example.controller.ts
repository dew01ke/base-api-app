import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { NoCache } from '@/core/interceptors/cache.interceptor';
import { routes } from '@/infrastructure/configs/routes';
import { ExampleService } from './example.service';
import { Response } from '@/core/utils/Response';
import { GetExampleRequest } from '@/dtos/example.request.dto';
import { Config } from '@/config';
import { ExampleResponse } from '@/dtos/example.response.dto';

@Controller()
export class ExampleController {
  constructor(
    private readonly config: Config,
    private readonly exampleService: ExampleService,
  ) {}

  @Get(routes.example.cached)
  @ApiResponse({ status: 200, type: Response })
  async cached(
    @Query() params: GetExampleRequest,
  ) {
    return `cached_${Math.random()}`;
  }

  @Get(routes.example.random)
  @NoCache()
  @ApiResponse({ status: 200, type: Response })
  async random(
    @Query() params: GetExampleRequest,
  ) {
    return new ExampleResponse('test', this.exampleService.decorateNumber(params.count));
  }
}
