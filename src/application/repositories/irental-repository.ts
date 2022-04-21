import { CreateRentalDTO } from '../dtos/create-rental-dto';

export interface IRentalRepository {
  create(rentalInput: CreateRentalDTO): Promise<void>;
}
