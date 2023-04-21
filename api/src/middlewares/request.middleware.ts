import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Config } from '@/config';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  constructor(
    private readonly config: Config,
  ) {}

  use(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    console.log('[Request]', req.ip, 'requested', req.originalUrl, req.query);

    next();
  }
}
