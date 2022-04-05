import { v4 as uuid } from 'uuid';

export class Specification {
  id: string;
  name: string;
  description: string;
  createdAt: Date;

  constructor() {
    this.id = this.id ?? uuid();
  }
}
