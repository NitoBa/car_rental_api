import { Rental } from '../../../domain/entities/rental';
import { IRentalRepository } from '../../repositories/irental-repository';

export class ListUserRentalsUsecase {
  constructor(private rentalRepository: IRentalRepository) {}

  async execute(userId: string): Promise<Rental[]> {
    const rentals = await this.rentalRepository.findAllByUserId(userId);
    return rentals;
  }
}
