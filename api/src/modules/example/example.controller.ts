import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { routes } from '@/infrastructure/configs/app.routes';
import { ExampleService } from './example.service';
import { Response } from '@/core/utils/Response';
import { GetExampleRequest } from '@/dtos/example.request.dto';
import { Config } from '@/config';

@Controller()
export class ExampleController {
  constructor(
    private readonly config: Config,
    private readonly exampleService: ExampleService,
  ) {}

  @Get(routes.example.single)
  @ApiResponse({ status: 200, type: Response })
  async example(
    @Query() params: GetExampleRequest,
  ) {
    return 'example';
  }

  @Get(routes.example.print_number)
  @ApiResponse({ status: 200, type: Response })
  async examplePrintNumber(
    @Query() params: GetExampleRequest,
  ) {
    return this.exampleService.decorateNumber(params.count);
  }
}
