import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../api/user.controller';
import { UserService } from './user.service';
import * as Models from '../models';
import { AuthService } from '../auth/auth.service';

describe('UserController', () => {
  let userService: UserService;
  let userController: UserController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, AuthService],
    }).compile();

    userService = module.get<UserService>(UserService);
    userController = module.get<UserController>(UserController);
    authService = module.get<AuthService>(AuthService);
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
      const login = await authService.login(mockUser.email, mockUser.password, mockUser.values);
      const input: Object = {
        user: {
          userId:
          login.accessToken
        },
      };

      const output: any = {
        id: 0,
        name: 'Bob',
        email: 'bob@gmail.com',
        password: 'bobPass',
      };
      jest.spyOn(userService, 'findOne').mockImplementation(() => output);

      expect(await userController.getUsers(input)).toBe(output);
    });
  });
});
