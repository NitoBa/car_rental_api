import { ICategoryRepository } from '../../repositories/category-repository';

type UpdateCategoryDTO = {
  id: string;
  name: string;
  description: string;
};

export class UpdateCategoryUsecase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute({ id, name, description }: UpdateCategoryDTO): Promise<void> {
    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new Error('Category not found.');
    }

    await this.categoryRepository.update({ id, name, description });
  }
}
