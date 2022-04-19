import { randomUUID } from 'node:crypto';

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
