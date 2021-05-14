import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginateService } from 'src/paginate/paginate.service';

// interface 
import User from './interface/user.interface';

@Injectable()
export class UserService {

    constructor(
        
        @InjectModel('User') private readonly userModel: Model<User>,
    ){}

    find(options:{}) {
        return this.userModel.find(options).sort({'createdAt':'desc'});
    }

    count(options:{}) {
        return this.userModel.count(options).exec();
    }
}
