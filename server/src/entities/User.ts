import { ObjectType, Field, ID } from "type-graphql";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
@ObjectType()
export class User {
    @Field(() => ID)
    // @prop({ required: true, unique: true })
    readonly _id: ObjectId;

    @Field()
    @prop({ required: true })
    creationDate: Date;

    @Field()
    @prop({ required: true })
    lastLoginDate: Date;

    @Field()
    @prop({ required: true })
    lastModifyDate: Date;

    @Field()
    @prop({ required: true })
    name: string;

    @Field()
    @prop({ required: true, unique: true })
    email: string;

    @Field()
    @prop({ required: true })
    salt: string;

    @Field()
    @prop({ required: true })
    hash: string;

    @Field(() => [String])
    @prop({ default: [] })
    teamID?: string[];

    // @Field(() => Int)
    // @prop({ default: 0 })
    // tokenVersion: number;

    @Field(() => [String])
    @prop({ default: [] })
    ip: string[];
}

export const UserModel = getModelForClass(User);
