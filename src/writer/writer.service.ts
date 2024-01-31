import { Injectable } from '@nestjs/common';
import { WriterRepository } from './writer.repository';
import { Writer } from './writer.schema';

@Injectable()
export class WriterService {
  constructor(private readonly writerRepository: WriterRepository) {}

  async findAll(): Promise<Writer[]> {
    return this.writerRepository.findAll();
  }

  async findById(id: string): Promise<Writer | null> {
    return this.writerRepository.findById(id);
  }

  async create(writerData: Partial<Writer>): Promise<Writer> {
    return this.writerRepository.create(writerData);
  }
  async update(writerData: Partial<Writer>, id: string): Promise<Writer> {
    return this.writerRepository.update(writerData, id);
  }
}
