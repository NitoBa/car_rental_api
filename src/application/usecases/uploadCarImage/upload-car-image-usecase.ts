import { ICarImageRepository } from '../../repositories/icar-images-repository';
import { ICarsRepository } from '../../repositories/icars-repository';

export class UploadCarImageUsecase {
  constructor(
    private readonly carImageRepository: ICarImageRepository,
    private readonly carsRepository: ICarsRepository
  ) {}

  async execute(carId: string, images: string[]): Promise<void> {
    if (!carId || images.length === 0) {
      throw new Error('Missing params');
    }

    const carExists = await this.carsRepository.findById(carId);

    if (!carExists) {
      throw new Error('Car not found');
    }
    await this.carImageRepository.uploadCarImage(carId, images);
  }
}
