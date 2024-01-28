import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './book.schema';
import { BookRepository } from './book.repository';
import { BookService } from './book.service';
import { BookController } from './book.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }])],
  providers: [BookRepository, BookService],
  controllers: [BookController],
})
export class BookModule {}
