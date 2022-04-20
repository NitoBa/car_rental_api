import { PrismaClient } from '@prisma/client';

import { CreateSpecificationCarDTO } from '../../application/dtos/create-specification-car-dto';
import { ISpecificationCarRepository } from '../../application/repositories/ispecifications-car-repository';

export class SpecificationsCarsRepository
  implements ISpecificationCarRepository
{
  constructor(private prisma: PrismaClient) {}
  async createSpecificationCar(
    input: CreateSpecificationCarDTO
  ): Promise<void> {
    const { carId, specificationId } = input;

    await this.prisma.specificationsCars.create({
      data: {
        carId,
        specificationId,
      },
    });
  }
}
