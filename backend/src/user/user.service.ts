import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// interface 
import User from './interface/user.interface';

@Injectable()
export class UserService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
    ){}

    // Get All Users
  //  ***************************************************************  //
    async getAllUsers() {
        return await this.userModel.find({});
    }
}
