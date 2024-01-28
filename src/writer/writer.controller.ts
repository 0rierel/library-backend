import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { WriterService } from './writer.service';
import { Writer } from './writer.schema';

@Controller('writers')
export class WriterController {
  constructor(private readonly writerService: WriterService) {}

  @Get()
  async findAll() {
    return this.writerService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.writerService.findById(id);
  }

  @Post()
  async create(@Body() writerData: Partial<Writer>) {
    return this.writerService.create(writerData);
  }

}
