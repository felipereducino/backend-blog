import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import User from './user.entity';
import { UserRepository } from './user.repository';

@Controller('user')
export class UserController {
  constructor(private repo: UserRepository) {}

  @Post()
  async create(@Body() user: User) {
    const newUser = await this.repo.createUser(user);
    return newUser;
  }

  @Get()
  async getAllUsers() {
    const users = await this.repo.findAllUsers();
    return users;
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() user: User) {
    user.id = +id;
    const updatedUser = await this.repo.updateUser({ ...user, id: +id });
    return updatedUser;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    try {
      const users = await this.repo.findOneUser(+id);
      return users;
    } catch (error) {
      console.error(error);
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.repo.deleteUser(+id);
  }
}
