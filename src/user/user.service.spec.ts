import { Test, TestingModule } from '@nestjs/testing';
import * as sinon from 'sinon';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService', () => {
  let userService: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserService),
          useValue: sinon.createStubInstance(Repository),
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  const mockUser = {
    id: 0,
    name: 'Bob',
    email: 'bob@gmail.com',
    password: 'bobPass',
  };

  it('should return User Model', async () => {
    const findByEmailNoteSpy = jest.spyOn(userService, 'findByEmail');
    userService.findByEmail(mockUser.email);
    expect(findByEmailNoteSpy).toBeTruthy();
  });

  it('should return User Model', async () => {
    const findOneNoteSpy = jest.spyOn(userService, 'findOne');
    userService.findOne(mockUser.id);
    expect(findOneNoteSpy).toBeTruthy();
  });
});
