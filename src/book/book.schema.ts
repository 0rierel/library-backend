import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book extends Document {
  @Prop({ required: true })
  _id: number;
  
  @Prop({ required: true })
  name: string;

  @Prop({ type: Number, ref: 'Writer', required: true })
  writer: number;

  @Prop({ type: [Number], ref: 'User' })
  readers: number[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
