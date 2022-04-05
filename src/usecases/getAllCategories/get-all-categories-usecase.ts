import { Category } from '../../entities/category';
import { ICategoryRepository } from '../../repositories/category-repository';

export class GetAllCategoriesUsecase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}
  async execute(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }
}
