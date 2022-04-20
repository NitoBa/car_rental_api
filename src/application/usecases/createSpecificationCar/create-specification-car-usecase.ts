/* eslint-disable no-restricted-syntax */
import { ICarsRepository } from '../../repositories/icars-repository';
import { ISpecificationCarRepository } from '../../repositories/ispecifications-car-repository';
import { ISpecificationRepository } from '../../repositories/ispecifications-repository';

export class CreateSpecificationCarUseCase {
  constructor(
    private readonly specificationRepository: ISpecificationRepository,
    private readonly carsRepository: ICarsRepository,
    private readonly specificationsCarsRepository: ISpecificationCarRepository
  ) {}

  async execute(specificationsId: string[], carId: string): Promise<void> {
    const car = await this.carsRepository.findById(carId);

    if (!car) {
      throw new Error('Car not found');
    }

    for await (const specificationId of specificationsId) {
      const specification = await this.specificationRepository.findById(
        specificationId
      );

      if (!specification) {
        throw new Error('Specification not found');
      }

      await this.specificationsCarsRepository.createSpecificationCar({
        carId,
        specificationId,
      });
    }
  }
}
