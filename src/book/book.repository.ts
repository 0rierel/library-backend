import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './book.schema';

@Injectable()
export class BookRepository {
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {}

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findById(id: string): Promise<Book | null> {
    return this.bookModel.findById(id).exec();
  }

  async create(bookData: Partial<Book>): Promise<Book> {
    const createdBook = new this.bookModel(bookData);
    return createdBook.save();
  }

  async deleteById(id: string): Promise<void> {
    this.bookModel.findByIdAndDelete(id).exec();
  }
  async update(bookId: string, bookData: Partial<Book>): Promise<Book> {
    return await this.bookModel
      .findOneAndUpdate({ _id: bookId }, bookData, { new: true })
      .exec();
  }

}
