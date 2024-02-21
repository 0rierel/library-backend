import { Injectable, NotFoundException } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Book } from './book.schema'
import { UserRepository } from '../user/user.repository'

@Injectable()
export class BookRepository {
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {}
  async findAll(): Promise<Book[]> {
    return await this.bookModel.find().populate({ path: 'author', select: 'name -_id' }).exec()
  }

  async findById(id: string): Promise<Book | null> {
    return await this.bookModel.findById(id).populate('readers').exec()
  }

  async getNotReadBooks(userId: string): Promise<Book[]> {
    return await this.bookModel
      .find({ readers: { $ne: userId } })
      .populate('author', '_id name')
      .exec()
  }

  async create(bookData: Partial<Book>): Promise<Book> {
    const createdBook = new this.bookModel(bookData)
    return await createdBook.save()
  }

  async deleteById(id: string): Promise<void> {
    this.bookModel.findByIdAndDelete(id).exec()
  }

  async update(bookId: string, bookData: Partial<Book>): Promise<Book> {
    return await this.bookModel.findOneAndUpdate({ _id: bookId }, bookData, { new: true }).exec()
  }

  //remove ref to reader
  async removeReader(bookId: string, userId: string): Promise<void> {
    const updatedBook = await this.bookModel.findOneAndUpdate(
      { _id: bookId, readers: userId },
      { $pull: { readers: userId } },
      { new: true },
    )

    if (!updatedBook) {
      throw new NotFoundException(`Book with ID ${bookId} not found or user not in readers.`)
    }
  }

  async addReader(bookId: string, userId: string): Promise<void> {
    const updatedBook = await this.bookModel.findByIdAndUpdate(
      bookId,
      {
        $addToSet: { readers: userId },
      },
      { new: true },
    )
    if (!updatedBook) {
      throw new NotFoundException(`Book with ID ${bookId} not found.`)
    }
  }
  async deleteBooksByAuthorId(authorId: string): Promise<void> {
    await this.bookModel.deleteMany({ author: authorId }).exec()
  }

  async getBookIdsByAuthorId(authorId: string): Promise<number[]> {
    return await this.bookModel.find({ author: authorId }).distinct('_id').exec()
  }

  async removeReaderFromAllBooks(userId: string): Promise<void> {
    await this.bookModel.updateMany({ readers: userId }, { $pull: { readers: userId } })
  }
}
