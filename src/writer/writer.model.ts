import { model } from 'mongoose';
import { Writer, WriterSchema } from './writer.schema';

export const WriterModel = model<Writer>('Writer', WriterSchema);
