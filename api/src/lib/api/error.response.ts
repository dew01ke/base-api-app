import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
    @ApiProperty()
    public readonly statusCode: number;

    @ApiProperty()
    public readonly message: string;

    @ApiProperty()
    public readonly error: string;

    private constructor(body: ErrorResponse) {
        this.statusCode = body.statusCode;
        this.message = body.message;
        this.error = body.error;
    }
}
