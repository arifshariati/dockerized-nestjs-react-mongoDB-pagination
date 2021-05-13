import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DataFactory, Seeder } from "nestjs-seeder";
import { User }  from "./user/schema/user.schema";

export class UserSeeder implements Seeder{

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
    ){}
    
    seed(): Promise<any> {
        const users = DataFactory.createForClass(User).generate(50) as any;
        return this.userModel.insertMany(users);
    }

    drop(): Promise<any> {
        return this.userModel.deleteMany({}) as any;
    }

}