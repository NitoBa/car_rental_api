import { ICategoryRepository } from '../repositories/icategory-repository';

export class ImportCategoryUsecase {
  constructor(private categoryRepository: ICategoryRepository) {}
}
