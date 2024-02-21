import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common'
import { AuthorService } from './author.service'
import { Author } from './author.schema'
import { BookService } from 'src/book/book.service'
import { UserService } from 'src/user/user.service'

@Controller('authors')
export class AuthorController {
  constructor(
    private readonly authorService: AuthorService,
    private readonly bookService: BookService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async findAll() {
    return await this.authorService.findAll()
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.authorService.findById(id)
  }

  @Post()
  async create(@Body() authorData: Partial<Author>) {
    return await this.authorService.create(authorData)
  }
  @Put(':id')
  async update(@Body() authorData: Partial<Author>, @Param('id') id: string) {
    return await this.authorService.update(authorData, id)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.authorService.delete(id)
    const ids = await this.authorService.getBooksId(id)
    if (ids) {
      await this.bookService.deleteBooksByAuthor(id)
      await this.userService.removeBooksReferencesFromUsers(ids)
    }
  }
}
