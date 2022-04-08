export interface IEncryptRepository {
  encrypt(value: string): Promise<string>;
  compare(value: string, hashedValue: string): Promise<boolean>;
}
