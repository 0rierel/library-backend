import { Injectable } from '@nestjs/common'
import { BookRepository } from './book.repository'
import { Book } from './book.schema'
import { UserService } from 'src/user/user.service'
import { AuthorService } from 'src/author/author.service'

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.findAll()
  }

  async findById(id: string): Promise<Book | null> {
    return await this.bookRepository.findById(id)
  }
  async getNotReadBooks(userId: string): Promise<Book[]> {
    return await this.bookRepository.getNotReadBooks(userId)
  }

  async create(bookData: Partial<Book>): Promise<Book> {
    return await this.bookRepository.create(bookData)
  }
  async deleteById(id: string): Promise<void> {
    await this.bookRepository.deleteById(id)
  }
  async update(bookData: Partial<Book>, bookId: string): Promise<Book> {
    return await this.bookRepository.update(bookId, bookData)
  }
  async removeReader(bookId: string, userId: string): Promise<void> {
    await this.bookRepository.removeReader(bookId, userId)
  }
  async addReader(bookId: string, userId: string): Promise<void> {
    await this.bookRepository.addReader(bookId, userId)
  }
  async deleteBooksByAuthor(authorId: string): Promise<void> {
    await this.bookRepository.deleteBooksByAuthorId(authorId)
  }
  async removeReaderFromAllBooks(userId: string): Promise<void> {
    await this.bookRepository.removeReaderFromAllBooks(userId)
  }
}
