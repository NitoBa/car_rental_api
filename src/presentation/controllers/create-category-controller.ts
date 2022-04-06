import { Request, Response } from 'express';

import { CreateCategoryUsecase } from '../../application/usecases/create-category-usecase';

export class CreateCategoryController {
  constructor(private readonly createCategory: CreateCategoryUsecase) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;
    try {
      await this.createCategory.execute({ name, description });

      return res.status(201);
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected error.',
      });
    }
  }
}
