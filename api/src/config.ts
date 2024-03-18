import { Type, Transform } from 'class-transformer';
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

    @Allow()
    @Transform(({ value }: { value: string }) => (value.split(',')))
    public readonly CORS_ORIGIN: string | string[] = '*';

    @Allow()
    @Transform(({ value }: { value: string }) => (value.split(',')))
    public readonly CORS_METHODS: string[] = ['GET', 'POST', 'PUT', 'DELETE'];

    @Allow()
    @Transform(({ value }: { value: string }) => (value.split(',')))
    public readonly CORS_ALLOWED_HEADERS: string[] = ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'Authorization'];
}
