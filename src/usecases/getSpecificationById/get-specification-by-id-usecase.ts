import { Specification } from '../../domain/entities/specification';
import { ISpecificationRepository } from '../../repositories/specification-repository';

export class GetSpecificationByIdUsecase {
  constructor(
    private readonly specificationRepository: ISpecificationRepository
  ) {}

  async execute(id: string): Promise<Specification> {
    const specification = await this.specificationRepository.findById(id);

    if (!specification) {
      throw new Error('Specification not found');
    }

    return specification;
  }
}
