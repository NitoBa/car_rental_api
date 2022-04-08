import { NextFunction, Response, Request } from 'express';

import { IMiddleware } from '../../../../presentation/interfaces/middleware';

export const adaptMiddleware = (middleware: IMiddleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpResponse = await middleware.handle(req);

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 209) {
      if (httpResponse.body) {
        req.headers.userId = httpResponse.body;
      }

      next();
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body,
      });
    }
  };
};
