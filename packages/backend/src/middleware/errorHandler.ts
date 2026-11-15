import { Request, Response, NextFunction } from 'express';
import { AppError, sendError } from '../utils/apiResponse';

interface MongoError extends Error {
  code?: number;
  keyValue?: any;
  errors?: any;
}

export const errorHandler = (
  err: Error | AppError | MongoError,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  let statusCode = 500;
  let message = 'Internal server error';
  let errors: any[] | undefined;

  // Operational error from AppError
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }
  // Mongoose CastError
  else if (err.name === 'CastError') {
    statusCode = 404;
    message = 'Resource not found';
  }
  // Mongoose ValidationError
  else if (err.name === 'ValidationError') {
    statusCode = 400;
    const mongoErr = err as MongoError;
    message = 'Validation error';
    errors = Object.values(mongoErr.errors || {}).map((error: any) => ({
      field: error.path,
      message: error.message,
    }));
  }
  // Mongoose Duplicate Key Error
  else if ((err as MongoError).code === 11000) {
    statusCode = 400;
    const mongoErr = err as MongoError;
    const field = Object.keys(mongoErr.keyValue || {})[0];
    message = `${field} already exists`;
  }
  // JWT Errors
  else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid authentication token';
  }
  else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Your session has expired. Please login again.';
  }
  // Multer file upload errors
  else if (err.message && err.message.includes('file')) {
    statusCode = 400;
    message = err.message;
  }
  // Default error
  else if (process.env.NODE_ENV === 'development') {
    message = err.message;
  }

  // Log error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('❌ Error:', {
      name: err.name,
      message: err.message,
      stack: err.stack,
    });
  }

  return sendError(res, statusCode, message, errors);
};
