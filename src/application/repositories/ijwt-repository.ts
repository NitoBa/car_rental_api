export interface IJwtRepository {
  sign(sub: string, payload: any): string;
  verify(token: string): { sub: string; payload: any };
}
