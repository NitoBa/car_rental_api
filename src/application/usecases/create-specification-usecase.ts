import { ISpecificationRepository } from '../repositories/ispecifications-repository';

type CreateSpecificationDTO = {
  name: string;
  description: string;
};

export class CreateSpecificationUsecase {
  constructor(
    private readonly specificationRepository: ISpecificationRepository
  ) {}

  async execute({ name, description }: CreateSpecificationDTO): Promise<void> {
    const specification = await this.specificationRepository.findByName(name);

    if (specification) {
      throw new Error('Specification already exists');
    }

    await this.specificationRepository.create({
      name,
      description,
    });
  }
}
