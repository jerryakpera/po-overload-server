import { ErrorStatus } from '@src/models/ErrorStatus';
import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: ErrorStatus, req: Request, res: Response, next: NextFunction) => {
  const { code, message } = err;

  res.status(code || 500).json({
    success: false,
    error: message || 'Oops! Something went wrong.',
  });
};

export default errorHandler;
