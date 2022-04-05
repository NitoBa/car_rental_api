import { ICategoryRepository } from '../repositories/icategory-repository';

type CreateCategoryDTO = {
  name: string;
  description: string;
};

export class CreateCategoryUsecase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}
  async execute({ name, description }: CreateCategoryDTO): Promise<void> {
    const category = await this.categoryRepository.findByName(name);

    if (category) {
      throw new Error('Category already exists.');
    }

    await this.categoryRepository.create({ name, description });
  }
}
