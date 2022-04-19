import { CreateCarDTO } from '../dtos/create-car-dto';
import { Car } from '../usecases/createCar/create-car-usecase.spec';

export interface ICarsRepository {
  findByPlate(plate: string): Promise<Car | undefined>;
  create(input: CreateCarDTO): Promise<void>;
}
