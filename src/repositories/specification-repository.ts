import { specifications } from '../database/in-memory-db';
import { Specification } from '../entities/specification';

export type CreateSpecificationDTO = {
  name: string;
  description: string;
};

export interface ISpecificationRepository {
  create({ name, description }: CreateSpecificationDTO): Promise<void>;
}

export class SpecificationRepository implements ISpecificationRepository {
  async create({ name, description }: CreateSpecificationDTO): Promise<void> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      createdAt: new Date(),
    });

    specifications.push(specification);
  }
}
