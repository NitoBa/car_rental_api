import { hash, compare } from 'bcryptjs';

import { IEncryptRepository } from '../../application/repositories/iencrypt-repository';

export class EncryptRepositoryBcrypt implements IEncryptRepository {
  async encrypt(value: string): Promise<string> {
    return hash(value, 10);
  }
  async compare(value: string, hashedValue: string): Promise<boolean> {
    return compare(value, hashedValue);
  }
}
