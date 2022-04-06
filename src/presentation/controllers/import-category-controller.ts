import { Request, Response } from 'express';
import { rm } from 'node:fs/promises';

import { ImportCategoryUsecase } from '../application/usecases/import-category-usecase';

export class ImportCategory {
  constructor(private importCategory: ImportCategoryUsecase) {}
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      await this.importCategory.execute(req.file);
      await rm(req.file.path);
      return res
        .status(200)
        .json({ message: 'Categories imported successfully' });
    } catch (err) {
      return res.status(400).json({
        message: err.message || 'Unexpected error.',
      });
    }
  }
}
