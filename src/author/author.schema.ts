import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class Author extends Document {
  @Prop({ required: true })
  _id: number

  @Prop({ required: true })
  name: string

  @Prop({ type: [Number], ref: 'Book' })
  books: number[]
}

export const AuthorSchema = SchemaFactory.createForClass(Author)
