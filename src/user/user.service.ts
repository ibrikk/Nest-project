import { Injectable } from '@nestjs/common';
import * as Models from '../models';

@Injectable()
export class UserService {
  private usersDb: Models.User[] = [
    {
      id: 0,
      name: 'Bob',
      email: 'bob@gmail.com',
      password: 'bobPass',
    },

    {
      id: 1,
      name: 'John',
      email: 'john@gmail.com',
      password: 'johnPass',
    },

    {
      id: 2,
      name: 'Gary',
      email: 'gary@gmail.com',
      password: 'garyPass',
    },
  ];

  findByEmail(requestEmail: string): Promise<Models.User | undefined> {
    const user = this.usersDb.find(
      (user) => user.email.toLowerCase() === requestEmail.toLowerCase(),
    );
    if (user) {
      return Promise.resolve(user);
    }
    return undefined;
  }

  findOne(userId: number): Promise<Models.User | undefined> {
    const user = this.usersDb.find((user) => user.id === userId);
    if (user) {
      return Promise.resolve(user);
    }
    return undefined;
  }
}
