import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private usersDb: User[] = [
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
    {
      id: 3,
      name: 'nijat', 
      email: 'nijat@gmail.com',
      password: 'nj'
    }
  ];

  findByEmail(requestEmail: string): Promise<User | undefined> {
    const user = this.usersDb.find((user) => user.email.toLowerCase() === requestEmail.toLowerCase());
    if (user) {
      return Promise.resolve(user);
    }
    return undefined;
  }

  findOne(userId: number): Promise<User | undefined> {
    const user = this.usersDb.find((user) => user.id === userId);
    if (user) {
      return Promise.resolve(user);
    }
    return undefined;
  }
}
