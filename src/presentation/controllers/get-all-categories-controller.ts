import { Request, Response } from 'express';

import { GetAllCategoriesUsecase } from '../../application/usecases/get-all-categories-usecase';

export class GetAllCategoriesController {
  constructor(private readonly getAllCategories: GetAllCategoriesUsecase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const categories = await this.getAllCategories.execute();

      return res.json(categories);
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error.',
      });
    }
  }
}
