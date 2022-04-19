import { Category } from '../../../domain/entities/category';
import { ICategoryRepository } from '../../repositories/icategory-repository';

export class GetAllCategoriesUsecase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}
  async execute(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }
}
