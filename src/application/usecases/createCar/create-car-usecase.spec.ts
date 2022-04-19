/* eslint-disable max-classes-per-file */
import { randomUUID } from 'node:crypto';

import { Category } from '../../../domain/entities/category';
import { InMemoryCarsRepository } from '../../../tests/repositories/in-memory-cars-repository';
import { InMemoryCategoryRepository } from '../../../tests/repositories/in-memory-category-repository';
import { CreateCarDTO } from '../../dtos/create-car-dto';
import { CreateCarUseCase } from './create-car-usecase';

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

const makeSut = () => {
  const carsRepository = new InMemoryCarsRepository();
  const categoryRepository = new InMemoryCategoryRepository();
  const sut = new CreateCarUseCase(carsRepository, categoryRepository);
  return { sut, carsRepository, categoryRepository };
};

describe('Create Car Usecase', () => {
  it('should not be able to create a car if not pass params', async () => {
    const { sut } = makeSut();
    const request: CreateCarDTO = {
      name: '',
      description: '',
      licensePlate: '',
      brand: '',
      category: '',
      fineAmount: 0,
      dailyRate: 0,
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

    const request: CreateCarDTO = {
      name: 'Kwid',
      description: 'any description',
      licensePlate: 'ABC-1234',
      brand: 'any brand',
      category: 'any category',
      fineAmount: 12,
      dailyRate: 1000,
    };
    await expect(sut.execute(request)).rejects.toThrow(
      'Car with the same plate already exists'
    );
  });

  it('should not be able to create a car if category not found', async () => {
    const { sut } = makeSut();

    const request: CreateCarDTO = {
      name: 'Kwid',
      description: 'any description',
      licensePlate: 'ABC-1234',
      brand: 'any brand',
      category: 'any category',
      fineAmount: 12,
      dailyRate: 1000,
    };
    await expect(sut.execute(request)).rejects.toThrow('Category not found');
  });

  it('should not be able to create a car with daily rate 0', async () => {
    const request: CreateCarDTO = {
      name: 'Kwid',
      description: 'any description',
      licensePlate: 'ABC-1234',
      brand: 'any brand',
      category: 'any category',
      fineAmount: 12,
      dailyRate: -1,
    };

    const { sut } = makeSut();
    await expect(sut.execute(request)).rejects.toThrow(
      'Daily Rate must be greater than 0'
    );
  });
  it('should not be able to create a car with fine amount 0', async () => {
    const request: CreateCarDTO = {
      name: 'Kwid',
      description: 'any description',
      licensePlate: 'ABC-1234',
      brand: 'any brand',
      category: 'any category',
      fineAmount: -12,
      dailyRate: 1000,
    };

    const { sut } = makeSut();
    await expect(sut.execute(request)).rejects.toThrow(
      'Fine Amount must be greater than 0'
    );
  });
  it('should be able to create a car', async () => {
    const request: CreateCarDTO = {
      name: 'Kwid',
      description: 'any description',
      licensePlate: 'ABC-1234',
      brand: 'any brand',
      category: 'any category',
      fineAmount: 12,
      dailyRate: 1000,
    };

    const { sut, carsRepository, categoryRepository } = makeSut();
    const category = new Category();
    Object.assign(category, {
      name: 'any category',
    });

    categoryRepository.categories.push(category);

    const result = await sut.execute(request);

    expect(result).toBeUndefined();
    expect(carsRepository.cars.length).toBe(1);
  });
});
