import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

// schema 
import { User, UserSchema } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PaginateModule } from '../paginate/paginate.module';
@Module({
  imports:[
    forwardRef(()=>PaginateModule),
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    }])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
