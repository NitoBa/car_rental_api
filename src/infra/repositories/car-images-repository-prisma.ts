import { PrismaClient } from '@prisma/client';

import { ICarImageRepository } from '../../application/repositories/icar-images-repository';

export class CarImagesRepositoryPrisma implements ICarImageRepository {
  constructor(private prisma: PrismaClient) {}
  async uploadCarImage(carId: string, images: string[]): Promise<void> {
    await this.prisma.carImages.createMany({
      data: images.map((image) => {
        return {
          carId,
          imageUrl: image,
        };
      }),
    });
  }
}
