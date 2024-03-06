import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Model } from 'mongoose'

@Schema()
export class Author extends Document {
  @Prop()
  _id: number

  @Prop({ required: true })
  name: string

  @Prop({ type: [Number], ref: 'Book' })
  books: number[]
}

export const AuthorSchema = SchemaFactory.createForClass(Author)

async function preSaveMiddleware(next) {
  if (!this._id) {
    const highestIdDoc = await (this.constructor as Model<Author>).findOne({}, {}, { sort: { _id: -1 } })
    this._id = highestIdDoc ? highestIdDoc._id + 1 : 1
  }

  next()
}

AuthorSchema.pre('save', preSaveMiddleware)