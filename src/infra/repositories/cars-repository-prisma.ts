import { PrismaClient } from '@prisma/client';

import { CreateCarDTO } from '../../application/dtos/create-car-dto';
import { UpdateSpecificationCarDTO } from '../../application/dtos/update-specification-car-dto';
import { ICarsRepository } from '../../application/repositories/icars-repository';
import { CarModel } from '../models/car-model';

export class CarsRepositoryPrisma implements ICarsRepository {
  constructor(private prisma: PrismaClient) {}
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
        specifications: true,
      },
    });

    return CarModel.fromPrisma(car, car.category.name, car.specifications);
  }
  async updateSpecification(input: UpdateSpecificationCarDTO): Promise<void> {
    const { carId, specificationId } = input;

    // const specification = await this.prisma.specification.findUnique({
    //   where: {
    //     id: specificationId,
    //   },
    // });

    await this.prisma.car.update({
      where: {
        id: carId,
      },
      data: {
        specificationsCars: {
          connectOrCreate: {
            where: {
              specificationId,
            },
            create: {
              specification: {
                connect: {
                  id: specificationId,
                },
              },
            },
          },
        },
      },
    });

    // await this.prisma.specificationsCars.create({
    //   data: {},
    // });
  }
  async findAllAvailable(): Promise<CarModel[]> {
    const cars = await this.prisma.car.findMany({
      where: {
        available: true,
      },
      include: {
        specifications: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    return cars.map((car) =>
      CarModel.fromPrisma(car, car.category.name, car.specifications)
    );
  }

  async findByPlate(plate: string): Promise<CarModel> {
    const car = await this.prisma.car.findUnique({
      where: {
        licensePlate: plate,
      },
      include: {
        specifications: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!car) return null;

    return CarModel.fromPrisma(car, car.category.name, car.specifications);
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
