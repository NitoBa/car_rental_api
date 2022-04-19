import { CreateCarDTO } from '../../application/dtos/create-car-dto';
import { ICarsRepository } from '../../application/repositories/icars-repository';
import { Car } from '../../application/usecases/createCar/create-car-usecase.spec';

export class InMemoryCarsRepository implements ICarsRepository {
  cars: Car[] = [];
  async create(input: CreateCarDTO): Promise<void> {
    const car = new Car();

    Object.assign(car, input);

    this.cars.push(car);
  }

  async findByPlate(plate: string): Promise<Car> {
    return this.cars.find((car) => car.licensePlate === plate);
  }
}
