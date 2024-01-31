import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Patch,
  Delete,
} from '@nestjs/common';
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

  @Delete(':id')
  async delete(@Param('id') id: string) {
    this.userService.delete(id);
    return 'success';
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() userData: Partial<User>) {
    return this.userService.update(id, userData);
  }
}
