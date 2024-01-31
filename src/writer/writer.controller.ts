import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
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
  @Put(':id')
  async update(@Body() writerData: Partial<Writer>, @Param('id') id: string) {
    return this.writerService.update(writerData, id);
  }
}
