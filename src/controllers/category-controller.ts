import { Request, Response } from 'express';

import { CategoryRepository } from '../repositories/category-repository';

export class CategoryController {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;
    const category = this.categoryRepository.findByName(name);

    if (category) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    this.categoryRepository.create({ name, description });

    return res.status(201).send();
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const categories = this.categoryRepository.findAll();

    return res.json(categories);
  }
}
