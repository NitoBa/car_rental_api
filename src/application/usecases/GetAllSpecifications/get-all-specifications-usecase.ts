import { Specification } from '../../domain/entities/specification';
import { ISpecificationRepository } from '../repositories/ispecifications-repository';

export class GetAllSpecificationsUsecase {
  constructor(
    private readonly specificationRepository: ISpecificationRepository
  ) {}

  async execute(): Promise<Specification[]> {
    return this.specificationRepository.findAll();
  }
}
