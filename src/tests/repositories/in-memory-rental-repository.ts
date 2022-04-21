import { randomUUID } from 'node:crypto';

import { CreateRentalDTO } from '../../application/dtos/create-rental-dto';
import { IRentalRepository } from '../../application/repositories/irental-repository';
import { Rental } from '../../domain/entities/rental';

export class InMemoryRentalRepository implements IRentalRepository {
  rentals: Rental[] = [];
  async findOpenByUserId(userId: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => userId === rental.userId && !rental.endDate
    );
  }
  async findOpenByCarId(carId: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => carId === rental.carId && !rental.endDate
    );
  }

  async create(rentalInput: CreateRentalDTO): Promise<Rental> {
    const rental = new Rental();
    Object.assign(rental, {
      expectReturnDate: rentalInput.expectReturnDate,
      startDate: new Date(),
      userId: rentalInput.userId,
      carId: rentalInput.carId,
    });
    this.rentals.push(rental);
    return rental;
  }
}
