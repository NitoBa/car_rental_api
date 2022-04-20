import { PrismaClient } from '@prisma/client';

import { ICarImageRepository } from '../../application/repositories/icar-images-repository';

export class CarImagesRepository implements ICarImageRepository {
  constructor(private prisma: PrismaClient) {}
  async uploadCarImage(carId: string, image: string): Promise<void> {
    this.prisma.carImages.create({
      data: {
        car: {
          connect: {
            id: carId,
          },
        },
        imageUrl: image,
      },
    });
  }
}
