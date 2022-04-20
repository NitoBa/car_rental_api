import { randomUUID } from 'node:crypto';

import { Specification } from './specification';

export class Car {
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
    this.id = this.id ?? randomUUID();
  }
}
