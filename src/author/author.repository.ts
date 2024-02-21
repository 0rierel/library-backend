import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Author } from './author.schema'

@Injectable()
export class AuthorRepository {
  constructor(@InjectModel('Author') private readonly authorModel: Model<Author>) {}

  async findAll(): Promise<Author[]> {
    return await this.authorModel.find().exec()
  }

  async findById(id: string): Promise<Author | null> {
    return await this.authorModel.findById(id).populate('books').exec()
  }
  async getBooksId(authorId: string): Promise<number[]> {
    return await this.authorModel.findById(authorId, { _id: 0, books: 1 })
  }

  async create(authorData: Partial<Author>): Promise<Author> {
    const createdAuthor = new this.authorModel(authorData)
    return await createdAuthor.save()
  }
  async update(authorData: Partial<Author>, id: string): Promise<Author> {
    return await this.authorModel.findOneAndUpdate({ _id: id }, authorData, { new: true }).exec()
  }
  async delete(id: string): Promise<void> {
    await this.authorModel.deleteOne({ _id: id }).exec()
  }
  async removeBookReferences(bookId: string): Promise<void> {
    await this.authorModel.updateMany({ books: bookId }, { $pull: { books: bookId } }).exec()
  }
}
