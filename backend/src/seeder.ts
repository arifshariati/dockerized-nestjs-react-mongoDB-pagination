import { MongooseModule } from "@nestjs/mongoose";
import { config } from "../config";
import { seeder } from "nestjs-seeder";
import { UserSeeder } from "./user.seeder";
import { User, UserSchema } from "./user/schema/user.schema";

console.log('config =', config);

seeder({
    imports:[
        MongooseModule.forRoot('mongodb://admin:admin@localhost:27017/nestjs-react-pagination?authSource=admin'),
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
        }]),
    ],
}).run([UserSeeder]);