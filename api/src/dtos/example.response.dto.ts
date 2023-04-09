import { ApiProperty } from '@nestjs/swagger';

export class ExampleResponse {
  @ApiProperty()
  public name: string;

  @ApiProperty()
  public title: string;

  constructor(name: string, title: string) {
    this.name = name;
    this.title = title;
  }
}
