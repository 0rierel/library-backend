import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).populate('beenRead favorite').exec();
  }

  async create(userData: Partial<User>): Promise<User> {
    const createdUser = new this.userModel(userData);
    return createdUser.save();
  }
  async delete(id: string): Promise<void> {
    this.userModel.findByIdAndDelete(id).exec();
  }
  async update(userId: string, userData: Partial<User>): Promise<User> {
    return await this.userModel
      .findOneAndUpdate({ _id: userId }, userData, { new: true })
      .exec();
  }

  async updateFavorite(userId: number, bookId: number): Promise<User> {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    user.favorite = bookId;
    return user.save();
  }
}
