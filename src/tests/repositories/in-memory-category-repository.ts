import { CreateCategoryDTO } from '../../application/dtos/create-category-dto';
import { UpdateCategoryDTO } from '../../application/dtos/update-category-dto';
import { ICategoryRepository } from '../../application/repositories/icategory-repository';
import { Category } from '../../domain/entities/category';

export class InMemoryCategoryRepository implements ICategoryRepository {
  categories: Category[] = [];
  async create(category: CreateCategoryDTO): Promise<void> {
    const newCategory = new Category();
    Object.assign(newCategory, category);

    this.categories.push(newCategory);
  }
  update(category: UpdateCategoryDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Category> {
    throw new Error('Method not implemented.');
  }
  async findAll(): Promise<Category[]> {
    return this.categories;
  }
  async findByName(name: string): Promise<Category> {
    return this.categories.find((category) => category.name === name);
  }
}
