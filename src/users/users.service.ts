import { Injectable } from '@nestjs/common';
import { User } from 'src/model/user.interface';

@Injectable()
export class UsersService {
  private users: User[] = [
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

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN'): User[] {
    if (role) {
      return this.users.filter((user) => user.role === role);
    } else {
      return this.users;
    }
  }

  findOne(id: string): User {
    return this.users.find((user) => user.id === Number(id));
  }

  create(user: Omit<User, 'id'>): User {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = { ...user, id: usersByHighestId[0].id + 1 };
    this.users = [...this.users, newUser];

    return newUser;
  }

  update(id: string, userUpdate: Partial<User>): void {
    const users = this.users.map((user) => {
      if (user.id === Number(id)) {
        return { ...user, ...userUpdate };
      }
      return user;
    });
    this.users = [...users];
  }

  delete(id: string): void {
    const newUsers = this.users.filter((user) => user.id !== Number(id));
    this.users = [...newUsers];
  }
}
