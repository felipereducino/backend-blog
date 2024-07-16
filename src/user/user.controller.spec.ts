import { Test, TestingModule } from '@nestjs/testing';
import User from './user.entity';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

describe('UserController', () => {
  let controller: UserController;
  let repo: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserRepository,
          useValue: {
            createUser: jest.fn(),
            findAllUsers: jest.fn(),
            updateUser: jest.fn(),
            findOneUser: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    repo = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const user: User = {
        id: 1,
        name: 'John',
        email: 'john@example.com',
        password: 'password123',
      };
      const createdUser = { ...user, id: 1 };
      jest.spyOn(repo, 'createUser').mockResolvedValue(createdUser);

      expect(await controller.create(user)).toEqual(createdUser);
      expect(repo.createUser).toHaveBeenCalledWith(user);
    });
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        {
          id: 1,
          name: 'John',
          email: 'john@example.com',
          password: 'password123',
        },
      ];
      jest.spyOn(repo, 'findAllUsers').mockResolvedValue(users);

      expect(await controller.getAllUsers()).toEqual(users);
      expect(repo.findAllUsers).toHaveBeenCalled();
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const user: User = {
        id: 1,
        name: 'John',
        email: 'john@example.com',
        password: 'password123',
      };
      const updatedUser = { ...user, name: 'John Doe' };
      jest.spyOn(repo, 'updateUser').mockResolvedValue(updatedUser);

      expect(await controller.updateUser('1', user)).toEqual(updatedUser);
      expect(repo.updateUser).toHaveBeenCalledWith(user);
    });
  });

  describe('getUserById', () => {
    it('should return a user by id', async () => {
      const user: User = {
        id: 1,
        name: 'John',
        email: 'john@example.com',
        password: 'password123',
      };
      jest.spyOn(repo, 'findOneUser').mockResolvedValue(user);

      expect(await controller.getUserById('1')).toEqual(user);
      expect(repo.findOneUser).toHaveBeenCalledWith(1);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      jest.spyOn(repo, 'deleteUser').mockResolvedValue(undefined);

      await controller.deleteUser('1');
      expect(repo.deleteUser).toHaveBeenCalledWith(1);
    });
  });
});
