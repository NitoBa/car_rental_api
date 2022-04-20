import { Car as CarPrisma } from '@prisma/client/';

import { Car } from '../../domain/entities/car';

export class CarModel extends Car {
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
    super();
  }

  static fromPrisma(car: CarPrisma, categoryName: string) {
    const newCar = new CarModel();

    Object.assign(newCar, {
      id: car.id,
      name: car.name,
      description: car.description,
      licensePlate: car.licensePlate,
      available: car.available,
      brand: car.brand,
      category: categoryName,
      fineAmount: car.fineAmount,
      dailyRate: car.dailyRate,
    });

    return newCar;
  }
}
