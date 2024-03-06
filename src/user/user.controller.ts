import { Controller, Get, Post, Body, Param, Put, Patch, Delete } from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './user.schema'
import { BookService } from 'src/book/book.service'

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly bookService: BookService,
  ) {}
  @Get('getAll')
  async findAll() {
    return await this.userService.findAll()
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.userService.findById(id)
  }

  @Post('addUser')
  async create(@Body() body:{userName: string}) {
    return await this.userService.create(body.userName)
  }
  @Patch(':userId/updateFavorite/:bookId')
  async updateFavorite(@Param('userId') userId: number, @Param('bookId') bookId: number) {
    return await this.userService.updateFavorite(userId, bookId)
  }

  @Delete('removeUser/:id')
  async delete(@Param('id') id: string) {
    await this.userService.delete(id)
    await this.bookService.removeReaderFromAllBooks(id)
  }

  @Put('updateuser/:id')
  async update(@Param('id') id: string, @Body() userData: Partial<User>) {
    return await this.userService.update(id, userData)
  }
}
