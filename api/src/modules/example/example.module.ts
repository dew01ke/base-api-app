import { Logger, Module } from '@nestjs/common';

import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';

@Module({
    imports: [],
    providers: [Logger, ExampleService],
    controllers: [ExampleController],
})
export class ExampleModule {
}
