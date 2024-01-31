import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Writer } from './writer.schema';

@Injectable()
export class WriterRepository {
  constructor(
    @InjectModel('Writer') private readonly writerModel: Model<Writer>,
  ) {}

  async findAll(): Promise<Writer[]> {
    return this.writerModel.find().exec();
  }

  async findById(id: string): Promise<Writer | null> {
    return this.writerModel.findById(id).exec();
  }

  async create(writerData: Partial<Writer>): Promise<Writer> {
    const createdWriter = new this.writerModel(writerData);
    return createdWriter.save();
  }
  async update(writerData: Partial<Writer>, id: string): Promise<Writer> {
    return await this.writerModel
      .findOneAndUpdate({ _id: id }, writerData, { new: true })
      .exec();
  }
}
