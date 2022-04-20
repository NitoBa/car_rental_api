import { CreateSpecificationCarDTO } from '../dtos/create-specification-car-dto';

export interface ISpecificationCarRepository {
  createSpecificationCar(input: CreateSpecificationCarDTO): Promise<void>;
  findBySpecificationIdAndCarId(
    input: CreateSpecificationCarDTO
  ): Promise<boolean>;
}
