import { sign, verify } from 'jsonwebtoken';

import { IJwtRepository } from '../../application/repositories/ijwt-repository';

export class JwtRepository implements IJwtRepository {
  sign(sub: string, payload: any): string {
    const secret = process.env.JWT_SECRET_KEY;
    const token = sign(payload, secret, { subject: sub, expiresIn: '1h' });
    return token;
  }
  verify(token: string): { sub: string; payload: any } {
    const secret = process.env.JWT_SECRET_KEY;
    const tokenDecoded = verify(token, secret);
    return {
      sub: tokenDecoded.sub as string,
      payload: tokenDecoded,
    };
  }
}
