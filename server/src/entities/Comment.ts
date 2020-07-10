import { ObjectType, Field, ID } from "type-graphql";
import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { User } from "./User";
@ObjectType()
export class Comment {
    @Field(() => ID)
    // @prop({ required: true, unique: true })
    readonly _id: ObjectId;

    @Field()
    @prop({ required: true })
    creationDate: Date;

    @Field()
    @prop({ required: true })
    lastModifyDate: Date;

    @Field()
    @prop({ required: true })
    text: string;

    @Field(() => User, { nullable: true })
    @prop({ Ref: "User" })
    couches?: Ref<User>;

    @Field(() => [String])
    @prop({ default: [] })
    ip: string[];
}

export const CommentModel = getModelForClass(Event);
