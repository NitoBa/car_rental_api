import { CreateSpecificationDTO } from '../../application/dtos/create-specification-dto';
import { ISpecificationRepository } from '../../application/repositories/ispecifications-repository';
import { Specification } from '../../domain/entities/specification';

export class InMemorySpecificationRepository
  implements ISpecificationRepository
{
  specifications: Specification[] = [];
  async create({ name, description }: CreateSpecificationDTO): Promise<void> {
    const newSpecification = new Specification();
    Object.assign(newSpecification, { name, description });
    this.specifications.push(newSpecification);
  }
  async findAll(): Promise<Specification[]> {
    return this.specifications;
  }
  async findByName(name: string): Promise<Specification> {
    return this.specifications.find((spec) => spec.name === name);
  }
  findById(id: string): Promise<Specification> {
    throw new Error('Method not implemented.');
  }
}
