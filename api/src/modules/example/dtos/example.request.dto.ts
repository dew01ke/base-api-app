import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max } from 'class-validator';

export class GetExampleRequest {
    @ApiPropertyOptional({
        minimum: 0,
        maximum: 100,
        default: 6,
    })
    @IsInt()
    @Max(100)
    @IsOptional()
    @Type(() => Number)
    public count: number = 0;
}
