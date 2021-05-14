import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Factory } from "nestjs-seeder";

export type UserDocument = User & Document;

let gender = ['male', 'female'];
@Schema()
export class User {

    @Factory(faker => faker.name.findName())
    @Prop()
    name: string;

    @Factory(faker => faker.image.avatar())
    @Prop()
    avatar: string;

    @Factory(faker => faker.random.arrayElement(gender))
    @Prop()
    gender: string;

    @Factory(faker => faker.internet.email())
    @Prop()
    email: string;

    @Factory(faker => faker.phone.phoneNumber())
    @Prop()
    phone: string;

    @Factory(faker => faker.address.country())
    @Prop()
    country: string;

    @Factory(faker => faker.address.city())
    @Prop()
    city: string;

}
export const UserSchema = SchemaFactory.createForClass(User).set('timestamps',true);;