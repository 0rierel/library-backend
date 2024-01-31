import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.schema';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.bookService.findById(id);
  }

  @Post()
  async create(@Body() bookData: Partial<Book>) {
    return this.bookService.create(bookData);
  }
  @Delete()
  async deleteById(@Param('id') id: string) {
    this.bookService.deleteById(id);
  }
  @Put(':id')
  async update(@Body() bookData: Partial<Book>, @Param('id') id: string) {
    return this.bookService.update(id, bookData);
  }
}
