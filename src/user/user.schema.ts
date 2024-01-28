import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  _id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [Number], ref: 'Book' })
  beenRead: number[];

  @Prop({ type: Number, ref: 'Book' })
  favorite: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
