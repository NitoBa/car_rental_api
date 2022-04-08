import { PrismaClient } from '@prisma/client';

import { CreateCategoryDTO } from '../../application/dtos/create-category-dto';
import { UpdateCategoryDTO } from '../../application/dtos/update-category-dto';
import { ICategoryRepository } from '../../application/repositories/icategory-repository';
import { Category } from '../../domain/entities/category';

export class CategoryRepositoryPrisma implements ICategoryRepository {
  constructor(private prisma: PrismaClient) {}
  async create(category: CreateCategoryDTO): Promise<void> {
    await this.prisma.category.create({
      data: {
        name: category.name,
        description: category.description,
      },
    });
  }
  async update(category: UpdateCategoryDTO): Promise<void> {
    await this.prisma.category.update({
      where: {
        id: category.id,
      },
      data: {
        name: category.name,
        description: category.description,
      },
    });
  }
  async delete(id: string): Promise<void> {
    await this.prisma.category.delete({ where: { id } });
  }
  async findById(id: string): Promise<Category> {
    const categoryDb = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });

    return categoryDb;
  }
  async findAll(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany();
    return categories;
  }
  async findByName(name: string): Promise<Category> {
    const categoryDb = await this.prisma.category.findUnique({
      where: {
        name,
      },
    });

    return categoryDb;
  }
}
