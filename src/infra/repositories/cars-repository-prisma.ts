import { PrismaClient } from '@prisma/client';

import { CreateCarDTO } from '../../application/dtos/create-car-dto';
import { ICarsRepository } from '../../application/repositories/icars-repository';
import { Car } from '../../domain/entities/car';

export class CarsRepositoryPrisma implements ICarsRepository {
  constructor(private prisma: PrismaClient) {}

  async findByPlate(plate: string): Promise<Car> {
    const car = await this.prisma.car.findUnique({
      where: {
        licensePlate: plate,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!car) return null;

    const newCar = new Car();

    Object.assign(newCar, {
      id: car.id,
      name: car.name,
      description: car.description,
      fineAmount: car.fineAmount,
      dailyRate: car.dailyRate,
      licensePlate: car.licensePlate,
      category: car.category.name,
      brand: car.brand,
    });

    return newCar;
  }
  async create(input: CreateCarDTO): Promise<void> {
    const {
      name,
      description,
      fineAmount,
      dailyRate,
      licensePlate,
      category,
      brand,
    } = input;

    await this.prisma.car.create({
      data: {
        brand,
        name,
        description,
        fineAmount,
        dailyRate,
        licensePlate,
        category: {
          connect: {
            name: category,
          },
        },
      },
    });
  }
}
