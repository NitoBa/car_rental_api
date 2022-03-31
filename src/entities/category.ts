import { v4 as uuid } from 'uuid';

export class Category {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = this.id ?? uuid();
  }
}
