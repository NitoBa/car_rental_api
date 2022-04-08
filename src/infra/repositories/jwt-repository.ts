/* eslint-disable @typescript-eslint/no-explicit-any */
import { sign, verify } from 'jsonwebtoken';

import { TokenVerifyDTO } from '../../application/dtos/token-verify-dto';
import { IJwtRepository } from '../../application/repositories/ijwt-repository';

export class JwtRepository implements IJwtRepository {
  sign(sub: string, payload: any): string {
    const secret = process.env.JWT_SECRET_KEY;
    const token = sign(payload, secret, { subject: sub, expiresIn: '1h' });
    return token;
  }
  verify(token: string): TokenVerifyDTO {
    const secret = process.env.JWT_SECRET_KEY;
    const tokenDecoded = verify(token, secret);
    return {
      sub: tokenDecoded.sub as string,
      payload: tokenDecoded,
    };
  }
}
