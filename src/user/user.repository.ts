import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import User from './user.entity';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  async findAllUsers() {
    return this.prismaService.user.findMany();
  }

  async findOneUser(id: number) {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async createUser(user: User) {
    return this.prismaService.user.create({
      data: user as any,
    });
  }

  async updateUser(user: User) {
    if (!user.id) throw new Error('User has no ID');
    return this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: user as any,
    });
  }

  async deleteUser(id: number) {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
