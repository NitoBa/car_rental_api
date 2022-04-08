import { Category } from '../../domain/entities/category';
import { CreateCategoryDTO } from '../dtos/create-category-dto';
import { UpdateCategoryDTO } from '../dtos/update-category-dto';

export interface ICategoryRepository {
  create(category: CreateCategoryDTO): Promise<void>;
  update(category: UpdateCategoryDTO): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Category>;
  findAll(): Promise<Category[]>;
  findByName(name: string): Promise<Category>;
}
