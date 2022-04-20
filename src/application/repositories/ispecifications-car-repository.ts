import { createSpecificationCarDTO } from '../dtos/create-specification-car-dto';

export interface ISpecificationCarRepository {
  createSpecificationCar(input: createSpecificationCarDTO): Promise<void>;
}
