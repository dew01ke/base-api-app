import { IsInt, IsOptional, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

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
    count: number = 0;
}
