import { Allow } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class Config {
  @Allow()
  public readonly APP_HOST: string;

  @Allow()
  @Type(() => Number)
  public readonly APP_PORT: number;

  @Allow()
  @Transform(({ value }) => (value.split(',') || []))
  public readonly ALLOWED_HOSTS: string[];

  @Allow()
  @Type(() => Number)
  public readonly CACHE_TTL: number = 60 * 60 * 1000;
}
