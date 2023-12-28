import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeeService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createUsersDto: Prisma.UsersCreateInput) {
    return this.databaseService.users.create({ data: createUsersDto });
  }

  async findAll(role?: 'ADMIN' | 'CUSTOMER') {
    if (role) {
      return this.databaseService.users.findMany({
        where: {
          role,
        },
      });
    }

    return this.databaseService.users.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.users.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateEmployeeDto: Prisma.UsersUpdateInput) {
    return this.databaseService.users.update({
      where: {
        id,
      },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.users.delete({
      where: {
        id,
      },
    });
  }
}
