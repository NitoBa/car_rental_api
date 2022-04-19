import { IEncryptRepository } from '../../application/repositories/iencrypt-repository';

export class InMemoryEncryptRepository implements IEncryptRepository {
  async encrypt(value: string): Promise<string> {
    return `${value}-encrypted`;
  }
  async compare(value: string, hashedValue: string): Promise<boolean> {
    return `${value}-encrypted` === hashedValue;
  }
}
