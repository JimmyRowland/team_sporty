import { ObjectType, Field } from "type-graphql";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { CreationAndModificationDate } from "./CreationAndModificationDate";
@ObjectType()
export class Post extends CreationAndModificationDate {
    @Field()
    @prop({ required: false })
    content: string;

    @Field()
    @prop({ required: false })
    user: string;

    @Field(() => Boolean)
    @prop({ default: false })
    isPined: boolean;
}

export const PostModel = getModelForClass(Post);
