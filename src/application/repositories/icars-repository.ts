import { CarModel } from '../../infra/models/car-model';
import { CreateCarDTO } from '../dtos/create-car-dto';

export interface ICarsRepository {
  findByPlate(plate: string): Promise<CarModel | undefined>;
  findById(id: string): Promise<CarModel | undefined>;
  create(input: CreateCarDTO): Promise<void>;
  findAllAvailable(): Promise<CarModel[]>;
  updateAvailableStatus(status: boolean, carId: string): Promise<void>;
}
