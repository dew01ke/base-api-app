import { Injectable } from '@nestjs/common';

@Injectable()
export class ExampleService {
  constructor() {}

  decorateNumber(number: number) {
    return `decorated_${number}`;
  }
}
