import { Request, Response } from 'express';

import { CreateSpecificationUsecase } from '../application/usecases/create-specification-usecase';

export class CreateSpecificationController {
  constructor(
    private readonly createSpecification: CreateSpecificationUsecase
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    try {
      if (!description || !name) {
        return res.status(400).json({ error: 'Missing parameters' });
      }

      await this.createSpecification.execute({ name, description });

      return res.status(201).send();
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error.',
      });
    }
  }
}
