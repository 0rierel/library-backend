import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { UserRepository } from './user.repository'
import { UserSchema } from './user.schema'
import { BookService } from 'src/book/book.service'
import { BookModule } from 'src/book/book.module'

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), forwardRef(() => BookModule)],
  providers: [UserService, UserRepository, BookService],
  controllers: [UserController],
  exports: [UserRepository],
})
export class UserModule {}
