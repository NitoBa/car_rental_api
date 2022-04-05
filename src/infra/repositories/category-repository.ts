import {
  CreateCategoryDTO,
  ICategoryRepository,
  UpdateCategoryDTO,
} from '../../application/repositories/icategory-repository';
import { Category } from '../../domain/entities/category';
import { categories } from '../../external/database/in-memory-db';

export class CategoryRepository implements ICategoryRepository {
  async findAll(): Promise<Category[]> {
    return categories;
  }

  async findById(id: string): Promise<Category> {
    return categories.find((category) => category.id === id);
  }

  async findByName(name: string): Promise<Category> {
    return categories.find((category) => category.name === name);
  }

  async update({ id, name, description }: UpdateCategoryDTO): Promise<void> {
    const categoryIndex = categories.findIndex(
      (category) => category.id === id
    );

    const category = categories[categoryIndex];

    categories[categoryIndex] = Object.assign(category, {
      id,
      name,
      description,
      updatedAt: new Date(),
    });
  }

  async delete(id: string): Promise<void> {
    const categoryIndex = categories.findIndex(
      (category) => category.id === id
    );

    categories.splice(categoryIndex, 1);
  }

  async create({ name, description }: CreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    categories.push(category);
  }
}
