import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Model } from 'mongoose'

@Schema()
export class User extends Document {
  @Prop()
  _id: number

  @Prop({ required: true })
  name: string

  @Prop({ type: [Number], ref: 'Book' })
  beenRead: number[]

  @Prop({ type: Number, ref: 'Book' })
  favorite: number | undefined
}

export const UserSchema = SchemaFactory.createForClass(User)
async function preSaveMiddleware(next) {
  if (!this._id) {
    const highestIdDoc = await (this.constructor as Model<User>).findOne({}, {}, { sort: { _id: -1 } })
    this._id = highestIdDoc ? highestIdDoc._id + 1 : 1
  }

  next()
}

UserSchema.pre('save', preSaveMiddleware)