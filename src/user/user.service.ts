import { Injectable } from '@nestjs/common'
import { UserRepository } from './user.repository'
import { User } from './user.schema'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll()
  }

  async findById(id: string): Promise<User | null> {
    return await this.userRepository.findById(id)
  }

  async create(userName: string): Promise<User> {
    return await this.userRepository.create(userName)
  }
  async updateFavorite(userId: number, bookId: number): Promise<User> {
    return await this.userRepository.updateFavorite(userId, bookId)
  }
  async delete(userId: string): Promise<void> {
    await this.userRepository.delete(userId)
  }
  async update(userId: string, userData: Partial<User>): Promise<User> {
    return await this.userRepository.update(userId, userData)
  }
  async removeFromBeenRead(userId: string, bookId: string): Promise<void> {
    await this.userRepository.removeFromBeenRead(userId, bookId)
  }
  async addToBeenRead(userId: string, bookId: string): Promise<void> {
    await this.userRepository.addToBeenRead(userId, bookId)
  }
  async removeBookReferences(bookId: string): Promise<void> {
    await this.userRepository.removeBookReferences(bookId)
  }
  async removeBooksReferencesFromUsers(bookIds: number[]): Promise<void> {
    await this.userRepository.removeBooksReferencesFromUsers(bookIds)
  }
}
