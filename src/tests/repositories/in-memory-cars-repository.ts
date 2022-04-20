import { CreateCarDTO } from '../../application/dtos/create-car-dto';
import { UpdateSpecificationCarDTO } from '../../application/dtos/update-specification-car-dto';
import { ICarsRepository } from '../../application/repositories/icars-repository';
import { Car } from '../../domain/entities/car';

export class InMemoryCarsRepository implements ICarsRepository {
  cars: Car[] = [];
  async updateSpecification(input: UpdateSpecificationCarDTO): Promise<void> {
    const car = await this.findById(input.carId);
    const carIndex = this.cars.indexOf(car);

    const specification = car.specifications.find(
      (spec) => spec.id === input.specificationId
    );
    const specificationIndex = car.specifications.indexOf(specification);

    Object.assign(specification, {
      name: input.name,
      description: input.description,
    });

    this.cars[carIndex].specifications[specificationIndex] = specification;
  }
  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }
  async findAllAvailable(): Promise<Car[]> {
    return this.cars.filter((car) => car.available);
  }
  async create(input: CreateCarDTO): Promise<void> {
    const car = new Car();

    Object.assign(car, input);

    this.cars.push(car);
  }

  async findByPlate(plate: string): Promise<Car> {
    return this.cars.find((car) => car.licensePlate === plate);
  }
}
