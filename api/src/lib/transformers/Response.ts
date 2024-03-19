import { ApiProperty } from '@nestjs/swagger';

export class Response {
    @ApiProperty()
    public result: unknown;

    public constructor(result: unknown) {
        this.result = result;
    }
}
