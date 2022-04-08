import { hash, compare } from 'bcrypt';

import { IEncryptRepository } from '../../application/repositories/iencrypt-repository';

export class EncryptRepositoryBcrypt implements IEncryptRepository {
  async encrypt(value: string): Promise<string> {
    const salt = process.env.HASH_SALT;
    return hash(value, salt);
  }
  async compare(value: string, hashedValue: string): Promise<boolean> {
    return compare(value, hashedValue);
  }
}
