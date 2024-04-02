import { Logger, Module } from '@nestjs/common';

import { ExampleController } from './controllers/example.controller';
import { ExampleService } from './services/example.service';

@Module({
    imports: [],
    providers: [Logger, ExampleService],
    controllers: [ExampleController],
})
export class ExampleModule {
}
