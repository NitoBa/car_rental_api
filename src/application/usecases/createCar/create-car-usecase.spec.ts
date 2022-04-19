/* eslint-disable max-classes-per-file */
import { randomUUID } from 'node:crypto';

import { InMemoryCategoryRepository } from '../../../tests/repositories/in-memory-category-repository';
import { ICategoryRepository } from '../../repositories/icategory-repository';

export type CreateCarRequest = {
  name: string;
  description: string;
  licensePlate: string;
  brand: string;
  category: string;
  fineAmount: string;
  dailyRate: string;
};

export class Car {
  id: string;
  name: string;
  description: string;
  licensePlate: string;
  available: boolean;
  brand: string;
  category: string;
  fineAmount: string;
  dailyRate: string;

  constructor() {
    this.id = this.id ?? randomUUID();
  }
}

export interface ICarsRepository {
  findByPlate(plate: string): Promise<Car | undefined>;
}

export class InMemoryCarsRepository implements ICarsRepository {
  cars: Car[] = [];

  async findByPlate(plate: string): Promise<Car> {
    return this.cars.find((car) => car.licensePlate === plate);
  }
}

class CreateCarUseCase {
  constructor(
    private carsRepository: ICarsRepository,
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(input: CreateCarRequest): Promise<void> {
    const {
      brand,
      category,
      name,
      description,
      fineAmount,
      licensePlate,
      dailyRate,
    } = input;

    if (
      !brand ||
      !category ||
      !name ||
      !description ||
      !fineAmount ||
      !licensePlate ||
      !dailyRate
    ) {
      throw new Error('Missing required fields');
    }

    const carWithSamePlate = await this.carsRepository.findByPlate(
      licensePlate
    );

    if (carWithSamePlate) {
      throw new Error('Car with the same plate already exists');
    }
  }
}

const makeSut = () => {
  const carsRepository = new InMemoryCarsRepository();
  const categoryRepository = new InMemoryCategoryRepository();
  const sut = new CreateCarUseCase(carsRepository, categoryRepository);
  return { sut, carsRepository, categoryRepository };
};

describe('Create Car Usecase', () => {
  it('should not be able to create a car if not pass params', async () => {
    const { sut } = makeSut();
    const request: CreateCarRequest = {
      name: '',
      description: '',
      licensePlate: '',
      brand: '',
      category: '',
      fineAmount: '',
      dailyRate: '',
    };
    await expect(sut.execute(request)).rejects.toThrow(
      'Missing required fields'
    );
  });

  it('should not be able to create a car with the same plate', async () => {
    const { sut, carsRepository } = makeSut();
    const newCar = new Car();

    Object.assign(newCar, {
      licensePlate: 'ABC-1234',
    });

    carsRepository.cars.push(newCar);

    const request: CreateCarRequest = {
      name: 'Kwid',
      description: 'any description',
      licensePlate: 'ABC-1234',
      brand: 'any brand',
      category: 'any category',
      fineAmount: '12',
      dailyRate: '1000',
    };
    await expect(sut.execute(request)).rejects.toThrow(
      'Car with the same plate already exists'
    );
  });
});
