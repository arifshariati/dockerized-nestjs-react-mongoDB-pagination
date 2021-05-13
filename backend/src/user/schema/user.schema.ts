import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Factory } from "nestjs-seeder";

export type UserDocument = User & Document;

@Schema()
export class User {

    @Factory(faker => faker.name.findName())
    @Prop()
    name: string;

    @Factory(faker => faker.internet.email())
    @Prop()
    email: string;

}
export const UserSchema = SchemaFactory.createForClass(User).set('timestamps',true);;