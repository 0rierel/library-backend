import { Injectable, NotFoundException } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './user.schema'

@Injectable()
export class UserRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec()
  }

  async findById(id: string): Promise<User | null> {
    return await this.userModel
      .findById(id)
      .populate({
        path: 'beenRead',
        populate: { path: 'author' },
      })
      .populate('favorite')
      .exec()
  }

  async create(userName: string): Promise<User> {
    const createdUser = new this.userModel({ name: userName })
    return await createdUser.save()
  }
  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec()
  }
  async update(userId: string, userData: Partial<User>): Promise<User> {
    return await this.userModel.findOneAndUpdate({ _id: userId }, userData, { new: true }).exec()
  }

  async updateFavorite(userId: number, bookId: number): Promise<User> {
    const user = await this.userModel
      .findById(userId)
      .populate({
        path: 'beenRead',
        populate: { path: 'author' },
      })
      .exec()

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`)
    }

    if (user.favorite == bookId) {
      user.favorite = undefined
    } else {
      user.favorite = bookId
      await user.populate('favorite')
    }
    

    return user.save()
  }

  // only being called through book controller to remove both sides of the refs
async removeFromBeenRead(userId: string, bookId: string): Promise<void> {
  const updatedUser = await this.userModel.findOneAndUpdate(
    { _id: userId, beenRead: bookId },
    { $pull: { beenRead: bookId } },
    { new: true },
  );

  if (!updatedUser) {
    throw new NotFoundException(`User with ID ${userId} not found or book not in beenRead.`);
  }

  if (updatedUser.favorite == parseInt(bookId)) {
    updatedUser.favorite = undefined;
    await updatedUser.save();
  }
}

  // only being called through book controller to add both sides of the refs
  async addToBeenRead(userId: string, bookId: string): Promise<void> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: userId, beenRead: { $ne: bookId } },
      { $addToSet: { beenRead: bookId } },
      { new: true },
    )

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${userId} not found or book already in beenRead.`)
    }
  }
  async removeBookReferences(bookId: string): Promise<void> {
    await this.userModel
      .updateMany({ beenRead: bookId, favorite: bookId }, { $pull: { beenRead: bookId, favorite: bookId } })
      .exec()
  }
  async removeBooksReferencesFromUsers(bookIds: number[]): Promise<void> {
    await this.userModel
      .updateMany(
        { $or: bookIds.map((bookId) => ({ beenRead: bookId, favorite: bookId })) },
        { $pullAll: { beenRead: bookIds, favorite: bookIds } },
      )
      .exec()
  }
}
