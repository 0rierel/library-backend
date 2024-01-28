import { Controller, Get, Post, Body, Param, Put, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Post()
  async create(@Body() userData: Partial<User>) {
    return this.userService.create(userData);
  }
  @Patch(':userId/:bookId')
  async updateFavorite(
    @Param('userId') id: number,
    @Param('bookId') bookId: number,
  ) {
    return this.userService.updateFavorite(id, bookId);
  }
}
