import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { BookSchema } from './book.schema'
import { BookRepository } from './book.repository'
import { BookService } from './book.service'
import { BookController } from './book.controller'
import { UserModule } from 'src/user/user.module'
import { UserService } from 'src/user/user.service'
import { AuthorModule } from 'src/author/author.module'
import { AuthorService } from 'src/author/author.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]), UserModule, AuthorModule],
  providers: [BookService, BookRepository, UserService, AuthorService],
  controllers: [BookController],
  exports: [BookRepository],
})
export class BookModule {}
