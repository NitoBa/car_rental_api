import { Category } from '../entities/category';

type CreateCategoryDTO = {
  name: string;
  description: string;
};

export class CategoryRepository {
  categories: Category[];

  constructor() {
    this.categories = [];
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
