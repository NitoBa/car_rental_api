import { Request, Response } from 'express';

import { GetAllSpecificationsUsecase } from '../application/usecases/get-all-specifications-usecase';

export class GetAllSpecificationsController {
  constructor(
    private readonly getAllSpecifications: GetAllSpecificationsUsecase
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const specifications = await this.getAllSpecifications.execute();
      return res.json(specifications);
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error.',
      });
    }
  }
}
