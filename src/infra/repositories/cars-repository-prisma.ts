import { PrismaClient } from '@prisma/client';

import { CreateCarDTO } from '../../application/dtos/create-car-dto';
import { ICarsRepository } from '../../application/repositories/icars-repository';
import { CarModel } from '../models/car-model';

export class CarsRepositoryPrisma implements ICarsRepository {
  constructor(private prisma: PrismaClient) {}
  async updateAvailableStatus(status: boolean, carId: string): Promise<void> {
    await this.prisma.car.update({
      where: {
        id: carId,
      },
      data: {
        available: status,
      },
    });
  }
  async findById(id: string): Promise<CarModel> {
    const car = await this.prisma.car.findUnique({
      where: {
        id,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
        specificationsCars: {
          include: {
            specification: true,
          },
        },
      },
    });

    if (!car) return null;

    const specifications = car.specificationsCars.map(
      (specification) => specification.specification
    );

    return CarModel.fromPrisma(car, car.category.name, specifications);
  }

  async findAllAvailable(): Promise<CarModel[]> {
    const cars = await this.prisma.car.findMany({
      where: {
        available: true,
      },
      include: {
        specificationsCars: {
          include: {
            specification: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    return cars.map((car) => {
      const specifications = car.specificationsCars.map(
        (specification) => specification.specification
      );

      return CarModel.fromPrisma(car, car.category.name, specifications);
    });
  }

  async findByPlate(plate: string): Promise<CarModel> {
    const car = await this.prisma.car.findUnique({
      where: {
        licensePlate: plate,
      },
      include: {
        specificationsCars: {
          include: {
            specification: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!car) return null;

    const specifications = car.specificationsCars.map(
      (specification) => specification.specification
    );

    return CarModel.fromPrisma(car, car.category.name, specifications);
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
