import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { WriterModule } from './writer/writer.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/library'), BookModule, UserModule, WriterModule],
  controllers: [], 
})
export class AppModule {}
