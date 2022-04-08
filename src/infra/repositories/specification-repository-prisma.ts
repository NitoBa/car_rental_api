import { PrismaClient } from '@prisma/client';

import {
  CreateSpecificationDTO,
  ISpecificationRepository,
} from '../../application/repositories/ispecifications-repository';
import { Specification } from '../../domain/entities/specification';

export class SpecificationRepositoryPrisma implements ISpecificationRepository {
  constructor(private prisma: PrismaClient) {}
  async findByName(name: string): Promise<Specification> {
    return this.prisma.specification.findFirst({
      where: {
        name,
      },
    });
  }

  async findById(id: string): Promise<Specification> {
    return this.prisma.specification.findUnique({
      where: { id },
    });
  }

  async findAll(): Promise<Specification[]> {
    return this.prisma.specification.findMany();
  }

  async create({ name, description }: CreateSpecificationDTO): Promise<void> {
    await this.prisma.specification.create({
      data: {
        name,
        description,
      },
    });
  }
}
