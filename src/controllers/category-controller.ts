import { Request, Response } from 'express';

import { CategoryRepository } from '../repositories/category-repository';

export class CategoryController {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  create(req: Request, res: Response): void {
    const { name, description } = req.body;

    this.categoryRepository.create({ name, description });

    res.status(201).send();
  }
}
