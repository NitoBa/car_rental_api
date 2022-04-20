import { randomUUID } from 'node:crypto';

import { CreateSpecificationCarDTO } from '../../application/dtos/create-specification-car-dto';
import { ISpecificationCarRepository } from '../../application/repositories/ispecifications-car-repository';

export type SpecificationCar = {
  id: string;
  carId: string;
  specificationId: string;
  createdAt: Date;
};

export class InMemorySpecificationCarRepository
  implements ISpecificationCarRepository
{
  async findBySpecificationIdAndCarId(
    input: CreateSpecificationCarDTO
  ): Promise<boolean> {
    return this.specificationsCar.some(
      (specificationCar) =>
        specificationCar.specificationId === input.specificationId &&
        specificationCar.carId === input.carId
    );
  }
  specificationsCar: SpecificationCar[] = [];
  async createSpecificationCar(
    input: CreateSpecificationCarDTO
  ): Promise<void> {
    this.specificationsCar.push({
      id: randomUUID(),
      carId: input.carId,
      specificationId: input.specificationId,
      createdAt: new Date(),
    });
  }
}
