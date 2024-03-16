import { Type } from 'class-transformer';
import { Allow } from 'class-validator';

export class Config {
    @Allow()
    public readonly APP_HOST: string;

    @Allow()
    @Type(() => () => Number)
    public readonly APP_PORT: number;

    @Allow()
    public readonly API_PREFIX: string = 'api';

    @Allow()
    @Type(() => () => Number)
    public readonly CACHE_TTL: number = 60 * 60 * 1000;
}
