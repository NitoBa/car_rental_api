import { Request, Response } from 'express';

import { UpdateCategoryUsecase } from '../application/usecases/update-category-usecase';

export class UpdateCategoryController {
  constructor(private readonly updateCategory: UpdateCategoryUsecase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
      await this.updateCategory.execute({ id, name, description });

      return res.status(204).send();
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected error.',
      });
    }
  }
}
