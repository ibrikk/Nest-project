import { sign } from 'jsonwebtoken';

class RefreshToken {
  constructor(init?: Partial<RefreshToken>) {
    Object.assign(this, init);
  }

  id: number;
  userId: number;
  userAgent: string;
  ipAddress: string;

  sign(): string {
    return sign({ ...this }, `${process.env.ACCESS_SECRET}`);
  }
}

export default RefreshToken;
