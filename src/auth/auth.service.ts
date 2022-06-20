import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as Models from '../models';
import RefreshToken from './entities/refresh-token.entity';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private refreshTokens: RefreshToken[] = [];

  constructor(private readonly userService: UserService) {}

  async refresh(refreshStr: string): Promise<string | undefined> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr);
    if (!refreshToken) {
      return undefined;
    }

    const user = await this.userService.findOne(refreshToken.userId);
    if (!user) {
      return undefined;
    }

    const accessToken = {
      userId: refreshToken.userId,
    };

    return sign(accessToken, `${process.env.ACCESS_SECRET}`, {
      expiresIn: '120s',
    });
  }

  private retrieveRefreshToken(refreshStr: string): RefreshToken | undefined {
    const decoded = verify(refreshStr, `${process.env.REFRESH_SECRET}`);
    if (typeof decoded === 'string') {
      return undefined;
    }
    const result = this.refreshTokens.find(
      (token: RefreshToken) => token.id === decoded.dbRefreshToken.id,
    );
    return result; 
  
  }

  async login(
    email: string,
    password: string,
    values: { userAgent: string; ipAddress: string },
  ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return undefined;
    }
    if (user.password !== password) {
      return undefined;
    }

    return this.newRefreshAndAccessToken(user, values);
  }

  private async newRefreshAndAccessToken(
    user: Models.User,
    values: { userAgent: string; ipAddress: string },
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const refreshObject = new RefreshToken({
      id:
        this.refreshTokens.length === 0
          ? 0
          : this.refreshTokens[this.refreshTokens.length - 1].id + 1,
      ...values,
      userId: user.id,
    });
    this.refreshTokens.push(refreshObject);
    return {
      refreshToken: sign(
        { dbRefreshToken: refreshObject },
        `${process.env.REFRESH_SECRET}`,
      ),
      accessToken: sign(
        {
          userId: user.id,
        },
        `${process.env.ACCESS_SECRET}`,
        {
          expiresIn: '120s',
        },
      ),
    };
  }

  async logout(refreshStr: string): Promise<any | undefined> {
    const requestedRefreshToken = await this.retrieveRefreshToken(refreshStr);

    if (!requestedRefreshToken) {
      return undefined;
    }
    return (this.refreshTokens = this.refreshTokens.filter(
      (refreshToken) => refreshToken.id !== requestedRefreshToken.id,
    ));
  }
}
