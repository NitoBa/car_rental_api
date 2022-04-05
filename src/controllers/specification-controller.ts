import { Request, Response } from 'express';

import { ISpecificationRepository } from '../repositories/specification-repository';

export class SpecificationController {
  constructor(
    private readonly specificationRepository: ISpecificationRepository
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    if (!description || !name) {
      return res.status(400).json({ error: 'Missing parameters' });
    }

    await this.specificationRepository.create({
      name,
      description,
    });

    return res.status(201).send();
  }
}
