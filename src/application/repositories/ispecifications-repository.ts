import { Specification } from '../../domain/entities/specification';
import { CreateSpecificationDTO } from '../dtos/create-specification-dto';

export interface ISpecificationRepository {
  create({ name, description }: CreateSpecificationDTO): Promise<void>;
  findAll(): Promise<Specification[]>;
  findByName(name: string): Promise<Specification>;
  findById(id: string): Promise<Specification>;
}
