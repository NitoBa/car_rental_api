import { Request, Response } from 'express';

import { ImportCategoryUsecase } from '../application/usecases/import-category-usecase';

export class ImportCategory {
  constructor(private importCategory: ImportCategoryUsecase) {}
  async handle(req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ message: 'File uploaded' });
  }
}
