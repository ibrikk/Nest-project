import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../api/user.controller';
import { UserService } from './user.service';
import * as Models from '../models';
import { AuthService } from '../auth/auth.service';

describe('UserController', () => {
  let spyUserService: UserService;
  let userController: UserController;
  let spyAuthService: AuthService;

  beforeAll(async () => {
    const UserMockService = {
      provide: UserService,
      useFactory: () => ({
        findByEmail: jest.fn(() => []),
        findOne: jest.fn(() => []),
      }),
    };

    const AuthMockService = {
      provide: AuthService,
      useFactory: () => ({
        login: jest.fn(() => []),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, AuthService, UserMockService, AuthMockService],
    }).compile();

    spyUserService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
    spyAuthService = module.get<AuthService>(AuthService);
  });

  describe('UserController', () => {
    it('should return a User model', async () => {
      const mockUser = {
        email: 'bob@gmail.com',
        password: 'bobPass',
        values: {
          userAgent: '12',
          ipAddress: '12',
        },
      };
      const login = await spyAuthService.login(
        mockUser.email,
        mockUser.password,
        mockUser.values,
      );
      const generatedAccessToken: Object = {
        user: {
          userId: login.accessToken,
        },
      };

      const output: any = {
        id: 0,
        name: 'Bob',
        email: 'bob@gmail.com',
        password: 'bobPass',
      };
      jest.spyOn(spyUserService, 'findOne').mockImplementation(() => output);

      expect(await userController.getUsers(generatedAccessToken)).toBe(output);
    });
  });
});
