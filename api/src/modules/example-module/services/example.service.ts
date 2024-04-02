import { Injectable } from '@nestjs/common';

@Injectable()
export class ExampleService {
    public decorateNumber(number: number) {
        return `decorated_${number}`;
    }
}
