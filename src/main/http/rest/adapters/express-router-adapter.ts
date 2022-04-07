import { Request, Response } from 'express';

import { IController } from '../../../../presentation/interfaces/controller';

export const adaptRouter = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const httpResponse = await controller.handle(req);

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 209) {
      res.json(httpResponse.body);
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      });
    }
  };
};
