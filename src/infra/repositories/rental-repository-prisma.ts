import { PrismaClient } from '@prisma/client';

import { CreateRentalDTO } from '../../application/dtos/create-rental-dto';
import { IRentalRepository } from '../../application/repositories/irental-repository';
import { Rental } from '../../domain/entities/rental';

export class RentalRepositoryPrisma implements IRentalRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async updateStatues(rentalId: string, endDate: Date): Promise<void> {
    await this.prisma.rental.update({
      where: {
        id: rentalId,
      },
      data: {
        endDate,
      },
    });
  }
  async findById(id: string): Promise<Rental> {
    const rental = await this.prisma.rental.findUnique({
      where: {
        id,
      },
    });

    return rental;
  }

  async create(rentalInput: CreateRentalDTO): Promise<Rental> {
    const rental = await this.prisma.rental.create({
      data: {
        userId: rentalInput.userId,
        carId: rentalInput.carId,
        startDate: new Date(),
        expectReturnDate: new Date(rentalInput.expectReturnDate),
      },
    });

    return rental;
  }
  async findOpenByUserId(userId: string): Promise<Rental> {
    const rental = await this.prisma.rental.findFirst({
      where: {
        AND: {
          userId,
          endDate: {
            equals: null,
          },
        },
      },
    });

    return rental;
  }
  async findOpenByCarId(carId: string): Promise<Rental> {
    const rental = await this.prisma.rental.findFirst({
      where: {
        AND: {
          carId,
          endDate: {
            equals: null,
          },
        },
      },
    });

    return rental;
  }
}
