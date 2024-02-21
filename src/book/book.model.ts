import { model } from 'mongoose'
import { Book, BookSchema } from './book.schema'

export const BookModel = model<Book>('Book', BookSchema)
