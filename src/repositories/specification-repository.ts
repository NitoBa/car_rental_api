import { specifications } from '../database/in-memory-db';
import { Specification } from '../domain/entities/specification';

export type CreateSpecificationDTO = {
  name: string;
  description: string;
};

export interface ISpecificationRepository {
  create({ name, description }: CreateSpecificationDTO): Promise<void>;
  findAll(): Promise<Specification[]>;
  findByName(name: string): Promise<Specification>;
  findById(id: string): Promise<Specification>;
}

export class SpecificationRepository implements ISpecificationRepository {
  async findByName(name: string): Promise<Specification> {
    return specifications.find((specification) => specification.name === name);
  }

  async findById(id: string): Promise<Specification> {
    return specifications.find((specification) => specification.id === id);
  }

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
