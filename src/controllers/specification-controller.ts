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

    const specification = await this.specificationRepository.findByName(name);

    if (specification) {
      return res.status(400).json({ error: 'Specification already exists' });
    }

    await this.specificationRepository.create({
      name,
      description,
    });

    return res.status(201).send();
  }

  async index(req: Request, res: Response): Promise<Response> {
    const specifications = await this.specificationRepository.findAll();

    return res.json(specifications);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Missing id' });
    }

    const specification = await this.specificationRepository.findById(id);

    if (!specification) {
      return res.status(404).json({ error: 'Specification not found' });
    }

    return res.json(specification);
  }
}
