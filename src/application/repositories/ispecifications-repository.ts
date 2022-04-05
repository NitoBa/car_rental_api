import { Specification } from '../../domain/entities/specification';

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
