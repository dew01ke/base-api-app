import { Module } from '@nestjs/common';

import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';

@Module({
    imports: [],
    providers: [ExampleService],
    controllers: [ExampleController],
})
export class ExampleModule {
}
