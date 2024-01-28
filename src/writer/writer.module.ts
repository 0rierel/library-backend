import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WriterController } from './writer.controller';
import { WriterService } from './writer.service';
import { WriterRepository } from './writer.repository';
import { WriterSchema } from './writer.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Writer', schema: WriterSchema }])],
  providers: [WriterService, WriterRepository],
  controllers: [WriterController],
})
export class WriterModule {}
