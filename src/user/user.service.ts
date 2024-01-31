import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async create(userData: Partial<User>): Promise<User> {
    return this.userRepository.create(userData);
  }

  async updateFavorite( userId: number,bookId: number): Promise<User> {
    return this.userRepository.updateFavorite(userId,bookId);
  }
  async delete (userId: string): Promise<void> {
    this.userRepository.delete(userId);
  }
  async update (userId: string, userData: Partial<User>): Promise<User> { 
    return this.userRepository.update(userId, userData);
  }

}
