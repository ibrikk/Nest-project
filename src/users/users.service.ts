import { Injectable } from '@nestjs/common';
import { UsersModule } from './users.module';

@Injectable()
export class UsersService {
  private users: UsersModule[] = [
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
      id: 0,
      name: 'Bob',
      email: 'gary@gmail.com',
      password: 'garyPass',
    },
  ];

  findByEmail(email: string): Promise<UsersModule | undefined> {
    const user = this.users.find((user: UsersModule) => user.email === email);
    if (user) {
      return Promise.resolve(user);
    }
    return undefined;
  }

  findOne(id: number): Promise<UsersModule | undefined> {
    const user = this.users.find((user: UsersModule) => user.id === id);
    if (user) {
      return Promise.resolve(user);
    }
    return undefined;
  }
}
