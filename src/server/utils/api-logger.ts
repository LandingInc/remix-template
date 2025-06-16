import type { Request, Response, NextFunction } from 'express';

export function apiLogger(req: Request, res: Response, next: NextFunction) {
  if (!req.originalUrl.startsWith('/api/')) {
    return next();
  }

  const start = new Date();
  console.log(start.toISOString(), req.method, req.originalUrl);

  res.on('finish', () => {
    const end = new Date();
    const duration = end.getTime() - start.getTime();
    console.log(
      end.toISOString(),
      req.method,
      req.originalUrl,
      res.statusCode,
      `${duration}ms`,
    );
  });

  next();
}
