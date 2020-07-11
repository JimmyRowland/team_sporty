import { ObjectType, Field, ID } from "type-graphql";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
@ObjectType()
export class Message {
    @Field(() => ID)
    // @prop({ required: true, unique: true })
    readonly _id: ObjectId;

    @Field()
    @prop({ required: false })
    creationDate: string;

    @Field()
    @prop({ required: false })
    content: string;

    @Field()
    @prop({ required: false })
    user: string;

    @Field()
    @prop({ required: false })
    isPined: boolean;
}

export const MessageModel = getModelForClass(Message);
