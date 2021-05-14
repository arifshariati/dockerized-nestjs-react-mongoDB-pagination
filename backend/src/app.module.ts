import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// config 
import { config } from '../config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { PaginateModule } from './paginate/paginate.module';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    MongooseModule.forRoot(config.mongo.uri, config.mongo.config),
    UserModule,
    PaginateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
