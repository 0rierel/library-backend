import { Controller, Get, Post, Body, Param, Delete, Put, Patch } from '@nestjs/common'
import { BookService } from './book.service'
import { Book } from './book.schema'
import { UserService } from 'src/user/user.service'
import { AuthorService } from 'src/author/author.service'

@Controller('books')
export class BookController {
  constructor(
    private readonly bookService: BookService,
    private readonly userService: UserService,
    private readonly authorService: AuthorService,
  ) {}

  @Get()
  async findAll() {
    return await this.bookService.findAll()
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.bookService.findById(id)
  }

  @Get('notRead/:userId')
  async getNotReadBooks(@Param('userId') userId: string) {
    return await this.bookService.getNotReadBooks(userId)
  }

  @Post()
  async create(@Body() bookData: Partial<Book>) {
    return await this.bookService.create(bookData)
  }
  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    await this.bookService.deleteById(id)
    await this.userService.removeBookReferences(id)
    await this.authorService.removeBookReferences(id)
  }
  @Put(':id')
  async update(@Body() bookData: Partial<Book>, @Param('id') id: string) {
    return await this.bookService.update(bookData, id)
  }
  @Patch(':bookId/readers/:userId')
  async addReader(@Param('bookId') bookId: string, @Param('userId') userId: string): Promise<void> {
    await this.bookService.addReader(bookId, userId)
    await this.userService.addToBeenRead(userId, bookId)
  }

  @Delete(':bookId/readers/:userId')
  async removeReader(@Param('bookId') bookId: string, @Param('userId') userId: string): Promise<void> {
    await this.bookService.removeReader(bookId, userId)
    await this.userService.removeFromBeenRead(userId, bookId)
  }
}
