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

@Controller('users')
export class UsersController {
  @Get() // GET /users OR /users?role=value
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN'): string[] {
    return ['user1', 'user2', role];
  }
  /*
  @Get('interns') // GET /users/interns
  findAllInterns(): string[] {
    return ['interns'];
  }
  */
  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string) {
    return { id };
  }

  @Post() // POST /users
  create(@Body() user: { name: string }) {
    return user;
  }

  @Patch(':id') // Patch /users/:id
  update(@Param('id') id: string, @Body() userUpdate: object) {
    return userUpdate;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return id;
  }
}
