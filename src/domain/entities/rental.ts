import { randomUUID } from 'node:crypto';

export class Rental {
  id: string;
  userId: string;
  carId: string;
  startDate: Date;
  endDate?: Date;
  expectReturnDate: Date;
  total?: number;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = this.id ?? randomUUID();
    this.createdAt = this.createdAt ?? new Date();
    this.updatedAt = this.updatedAt ?? new Date();
  }
}
