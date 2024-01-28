import { Injectable } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { Book } from './book.schema';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async findAll(): Promise<Book[]> {
    return this.bookRepository.findAll();
  }

  async findById(id: string): Promise<Book | null> {
    return this.bookRepository.findById(id);
  }

  async create(bookData: Partial<Book>): Promise<Book> {
    return this.bookRepository.create(bookData);
  }
  async deleteById(id: string): Promise<void> {
    this.bookRepository.deleteById(id);
  }

}
