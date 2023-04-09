import { Allow } from 'class-validator';
import { Type } from 'class-transformer';

export class Config {
  @Allow()
  public readonly APP_HOST: string;

  @Allow()
  @Type(() => Number)
  public readonly APP_PORT: number;

  @Allow()
  public readonly CORS_ORIGIN: string;

  @Allow()
  public readonly CORS_METHODS: string;

  @Allow()
  public readonly DB_HOST: string;

  @Allow()
  @Type(() => Number)
  public readonly DB_PORT: number;

  @Allow()
  public readonly DB_DATABASE: string;

  @Allow()
  public readonly DB_USERNAME: string;

  @Allow()
  public readonly DB_PASSWORD: string;

  @Allow()
  public readonly DB_SSL_CA: string;

  @Allow()
  @Type(() => Number)
  public readonly DB_POOL_SIZE: number;

  @Allow()
  public readonly DOCS_USERNAME: string;

  @Allow()
  public readonly DOCS_PASSWORD: string;

  @Allow()
  @Type(() => Number)
  public readonly CACHE_TTL: number = 60 * 60 * 1000;

  @Allow()
  @Type(() => Number)
  public readonly DISPLAY_ON_PAGE_COUNT: number;

  @Allow()
  @Type(() => Number)
  public readonly RELATED_POST_COUNT: number;

  @Allow()
  @Type(() => Number)
  public readonly DEFAULT_POPULAR_COUNT: number;
}
