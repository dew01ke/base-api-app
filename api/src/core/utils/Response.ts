import { ApiProperty } from '@nestjs/swagger';

export class Response {
  @ApiProperty()
  public result: any;

  constructor(result: any) {
    this.result = result;
  }
}
