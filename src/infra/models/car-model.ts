import { Car as CarPrisma } from '@prisma/client/';

import { Car } from '../../domain/entities/car';
import { Specification } from '../../domain/entities/specification';

export class CarModel extends Car {
  id: string;
  name: string;
  description: string;
  licensePlate: string;
  available: boolean;
  brand: string;
  category: string;
  specifications?: Specification[];
  fineAmount: string;
  dailyRate: string;

  constructor() {
    super();
  }

  static fromPrisma(
    car: CarPrisma,
    categoryName: string,
    specification: Specification[]
  ) {
    const newCar = new CarModel();

    newCar.specifications = specification;

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
