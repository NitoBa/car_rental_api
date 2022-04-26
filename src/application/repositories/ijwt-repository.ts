/* eslint-disable @typescript-eslint/no-explicit-any */
import { TokenVerifyDTO } from '../dtos/token-verify-dto';

export interface IJwtRepository {
  sign(sub: string, payload: any): string;
  signRefreshToken(sub: string, payload: any): string;
  verify(token: string): TokenVerifyDTO;
  verifyRefreshToken(refreshToken: string): TokenVerifyDTO;
}
