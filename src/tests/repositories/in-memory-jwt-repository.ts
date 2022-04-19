import { randomUUID } from 'node:crypto';

import { TokenVerifyDTO } from '../../application/dtos/token-verify-dto';
import { IJwtRepository } from '../../application/repositories/ijwt-repository';

export class InMemoryJWTRepository implements IJwtRepository {
  sign(sub: string, payload: any): string {
    return `${sub}.${payload}.${randomUUID()}`;
  }
  verify(token: string): TokenVerifyDTO {
    throw new Error('Method not implemented.');
  }
}
