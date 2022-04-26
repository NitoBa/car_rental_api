import { randomUUID } from 'node:crypto';

export class UserTokens {
  id: string;
  userId: string;
  refreshToken: string;
  expiresDate: Date;

  constructor() {
    this.id = this.id ?? randomUUID();
  }
}
