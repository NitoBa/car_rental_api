import { IEncryptRepository } from '../../application/repositories/iencrypt-repository';

export class InMemoryEncryptRepository implements IEncryptRepository {
  async encrypt(value: string): Promise<string> {
    return `${value}-encrypted`;
  }
  compare(value: string, hashedValue: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
