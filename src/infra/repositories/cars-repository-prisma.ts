import { PrismaClient } from '@prisma/client';

import { CreateCarDTO } from '../../application/dtos/create-car-dto';
import { ICarsRepository } from '../../application/repositories/icars-repository';
import { Car } from '../../domain/entities/car';
import { CarModel } from '../models/car-model';

export class CarsRepositoryPrisma implements ICarsRepository {
  constructor(private prisma: PrismaClient) {}
  async findAllAvailable(): Promise<CarModel[]> {
    const cars = await this.prisma.car.findMany({
      where: {
        available: true,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    return cars.map((car) => CarModel.fromPrisma(car, car.category.name));
  }

  async findByPlate(plate: string): Promise<CarModel> {
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

    return CarModel.fromPrisma(car, car.category.name);
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
