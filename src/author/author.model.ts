import { model } from 'mongoose'
import { Author, AuthorSchema } from './author.schema'

export const AuthorModel = model<Author>('Author', AuthorSchema)
