import { specifications } from '../database/in-memory-db';
import { Specification } from '../entities/specification';

export type CreateSpecificationDTO = {
  name: string;
  description: string;
};

export interface ISpecificationRepository {
  create({ name, description }: CreateSpecificationDTO): Promise<void>;
  findAll(): Promise<Specification[]>;
}

export class SpecificationRepository implements ISpecificationRepository {
  async findAll(): Promise<Specification[]> {
    return specifications;
  }
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
