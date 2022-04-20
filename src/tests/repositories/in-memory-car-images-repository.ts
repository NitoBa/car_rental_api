import { ICarImageRepository } from '../../application/repositories/icar-images-repository';

export type CarImages = {
  carId: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

export class InMemoryCarImagesRepository implements ICarImageRepository {
  carImages: CarImages[] = [];

  async uploadCarImage(carId: string, images: string[]): Promise<void> {
    images.forEach((image) => {
      this.carImages.push({
        carId,
        imageUrl: image,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
  }

  async getCarImage(carId: string): Promise<string> {
    return this.carImages[carId];
  }
}
