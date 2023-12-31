import { NextFunction, Request, Response } from 'express';

// next is mandatory argument for error handler
export function handleErrors(err: any, _req: Request, res: Response, _next: NextFunction) {
  // Check for name because expressJwt uses the same errors
  if (err.name === 'UnauthorizedError') {
    return res.status(err.status || 401).json({error: 'ERROR.UNAUTHORIZED'});
  }
  res.status(500).json({error: 'ERROR.SERVER_ERROR'});
}
