import { Controller, Get, Post, Body, Param, Put, Patch, Delete } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './user.schema'
import { BookService } from 'src/book/book.service'
// בקשות קריאות
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly bookService: BookService,
  ) {}
  @Get()
  async findAll() {
    return await this.userService.findAll()
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.userService.findById(id)
  }

  @Post()
  async create(@Body() userData: Partial<User>) {
    return await this.userService.create(userData)
  }
  @Patch(':userId/:bookId')
  async updateFavorite(@Param('userId') userId: number, @Param('bookId') bookId: number) {
    return await this.userService.updateFavorite(userId, bookId)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.userService.delete(id)
    await this.bookService.removeReaderFromAllBooks(id)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() userData: Partial<User>) {
    return await this.userService.update(id, userData)
  }
}
