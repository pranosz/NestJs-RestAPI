import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/CreateUserDto';
import { UpdateUserDto } from 'src/dto/UpdateUserDto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Piotr',
      email: 'heja@wp.pl',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Kot',
      email: 'hekot@onet.plja@wp.pl',
      role: 'ADMIN',
    },
    {
      id: 3,
      name: 'Lena',
      email: 'Lena@wp.pl',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Robert',
      email: 'rob@wp.pl',
      role: 'ENGINEER',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const roles = this.users.filter((user) => user.role === role);

      if (!roles.length) {
        throw new NotFoundException('User Role Not Found');
      }
      return roles;
    } else {
      return this.users;
    }
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return user;
  }

  create(user: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = { ...user, id: usersByHighestId[0].id + 1 };
    this.users = [...this.users, newUser];

    return newUser;
  }

  update(id: number, userUpdate: UpdateUserDto): void {
    const users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...userUpdate };
      }
      return user;
    });
    this.users = [...users];
  }

  delete(id: number): void {
    const newUsers = this.users.filter((user) => user.id !== id);
    this.users = [...newUsers];
  }
}
