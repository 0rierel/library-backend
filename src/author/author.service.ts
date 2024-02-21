import { Injectable } from '@nestjs/common'
import { AuthorRepository } from './author.repository'
import { Author } from './author.schema'

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  async findAll(): Promise<Author[]> {
    return await this.authorRepository.findAll()
  }

  async findById(id: string): Promise<Author | null> {
    return await this.authorRepository.findById(id)
  }
  async delete(id: string): Promise<void> {
    await this.authorRepository.delete(id)
  }

  async create(authorData: Partial<Author>): Promise<Author> {
    return await this.authorRepository.create(authorData)
  }
  async update(authorData: Partial<Author>, id: string): Promise<Author> {
    return await this.authorRepository.update(authorData, id)
  }
  async removeBookReferences(bookId: string): Promise<void> {
    await this.authorRepository.removeBookReferences(bookId)
  }
  async getBooksId(authorId: string): Promise<number[]> {
    return await this.authorRepository.getBooksId(authorId)
  }
}
