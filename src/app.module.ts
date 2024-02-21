import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { BookModule } from './book/book.module'
import { UserModule } from './user/user.module'
import { AuthorModule } from './author/author.module'
import { APP_FILTER } from '@nestjs/core'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CustomExceptionFilter } from './filters/custom-exception.filter'
import databaseConfig from './config/database.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get('database.host')}:${configService.get('database.port')}/${configService.get('database.name')}`,
      }),
      inject: [ConfigService],
    }),
    BookModule,
    UserModule,
    AuthorModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
  ],
})
export class AppModule {}
