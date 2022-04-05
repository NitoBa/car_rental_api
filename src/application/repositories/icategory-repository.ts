import { Category } from '../../domain/entities/category';

export type CreateCategoryDTO = {
  name: string;
  description: string;
};

export type UpdateCategoryDTO = {
  id: string;
  name: string;
  description: string;
};

export interface ICategoryRepository {
  create(category: CreateCategoryDTO): Promise<void>;
  update(category: UpdateCategoryDTO): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Category>;
  findAll(): Promise<Category[]>;
  findByName(name: string): Promise<Category>;
}
