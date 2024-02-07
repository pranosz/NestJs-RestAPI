import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/model/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // GET /users OR /users?role=value
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN'): User[] {
    return this.usersService.findAll(role);
  }
  /*
  @Get('interns') // GET /users/interns
  findAllInterns(): string[] {
    return ['interns'];
  }
  */
  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string): User {
    return this.usersService.findOne(id);
  }

  @Post() // POST /users
  create(@Body() user: Omit<User, 'id'>): User {
    return this.usersService.create(user);
  }

  @Patch(':id') // Patch /users/:id
  update(@Param('id') id: string, @Body() userUpdate: Partial<User>) {
    return this.usersService.update(id, userUpdate);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
