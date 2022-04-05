import { Specification } from '../../domain/entities/specification';
import { ISpecificationRepository } from '../../repositories/specification-repository';

export class GetAllSpecificationsUsecase {
  constructor(
    private readonly specificationRepository: ISpecificationRepository
  ) {}

  async execute(): Promise<Specification[]> {
    return this.specificationRepository.findAll();
  }
}
