import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthorController } from './author.controller'
import { AuthorService } from './author.service'
import { AuthorRepository } from './author.repository'
import { AuthorSchema } from './author.schema'
import { UserModule } from 'src/user/user.module'
import { UserService } from 'src/user/user.service'
import { BookService } from 'src/book/book.service'
import { BookModule } from 'src/book/book.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Author', schema: AuthorSchema }]),
    forwardRef(() => BookModule),
    forwardRef(() => UserModule),
  ],
  providers: [AuthorService, AuthorRepository, BookService, UserService],
  controllers: [AuthorController],
  exports: [AuthorRepository],
})
export class AuthorModule {}
