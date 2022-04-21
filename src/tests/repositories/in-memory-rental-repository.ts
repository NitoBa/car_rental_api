import { CreateRentalDTO } from '../../application/dtos/create-rental-dto';
import { IRentalRepository } from '../../application/repositories/irental-repository';
import { Rental } from '../../domain/entities/rental';

export class InMemoryRentalRepository implements IRentalRepository {
  rentals: Rental[] = [];
  async create(rentalInput: CreateRentalDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
