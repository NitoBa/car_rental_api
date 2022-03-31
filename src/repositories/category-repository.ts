import { categories } from '../database/categories';
import { Category } from '../entities/category';

type CreateCategoryDTO = {
  name: string;
  description: string;
};

type UpdateCategoryDTO = {
  id: string;
  name: string;
  description: string;
};

export class CategoryRepository {
  categories: Category[];
  constructor() {
    this.categories = categories;
  }

  findAll(): Category[] {
    return this.categories;
  }

  findById(id: string): Category {
    return this.categories.find((category) => category.id === id);
  }

  findByName(name: string): Category {
    return this.categories.find((category) => category.name === name);
  }

  update({ id, name, description }: UpdateCategoryDTO): void {
    const categoryIndex = this.categories.findIndex(
      (category) => category.id === id
    );

    const category = this.categories[categoryIndex];

    this.categories[categoryIndex] = Object.assign(category, {
      id,
      name,
      description,
      updatedAt: new Date(),
    });
  }

  create({ name, description }: CreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.categories.push(category);
  }
}
