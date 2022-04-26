import { Rental } from '../../domain/entities/rental';
import { CreateRentalDTO } from '../dtos/create-rental-dto';

export interface IRentalRepository {
  create(rentalInput: CreateRentalDTO): Promise<Rental>;
  updateStatues(rentalId: string, endDate: Date): Promise<void>;
  findById(id: string): Promise<Rental>;
  findAllByUserId(id: string): Promise<Rental[]>;
  findOpenByUserId(userId: string): Promise<Rental>;
  findOpenByCarId(carId: string): Promise<Rental>;
}
