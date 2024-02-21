import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Model } from 'mongoose'

@Schema()
export class Book extends Document {
  @Prop()
  _id: number

  @Prop({ required: true })
  name: string

  @Prop({ type: Number, ref: 'Author', required: true })
  author: number

  @Prop({ type: [Number], ref: 'User' })
  readers: number[]
}

export const BookSchema = SchemaFactory.createForClass(Book)

// לקבל או ליצור ממונגו objectId
async function preSaveMiddleware(next) {
  if (!this._id) {
    const highestIdDoc = await (this.constructor as Model<Book>).findOne({}, {}, { sort: { _id: -1 } })
    this._id = highestIdDoc ? highestIdDoc._id + 1 : 1
  }

  next()
}

BookSchema.pre('save', preSaveMiddleware)
