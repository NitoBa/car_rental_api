import { Request, Response } from 'express';

import { GetSpecificationByIdUsecase } from '../../application/usecases/get-specification-by-id-usecase';

export class GetSpecificationByIdController {
  constructor(private getSpecificationById: GetSpecificationByIdUsecase) {}
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: 'Missing id' });
      }

      const specification = await this.getSpecificationById.execute(id);

      return res.json(specification);
    } catch (error) {
      return res.status(400).json({
        message: error.message || 'Unexpected error.',
      });
    }
  }
}
