import { Request, Response } from 'express';

export class CategoryController {
  create(req: Request, res: Response): void {
    res.send('Category created');
  }
}
