import { Car } from '../../domain/entities/car';
import { CreateCarDTO } from '../dtos/create-car-dto';

export interface ICarsRepository {
  findByPlate(plate: string): Promise<Car | undefined>;
  findById(id: string): Promise<Car | undefined>;
  create(input: CreateCarDTO): Promise<void>;
  findAllAvailable(): Promise<Car[]>;
}
