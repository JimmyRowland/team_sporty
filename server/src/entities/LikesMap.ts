import { ObjectType, Field } from "type-graphql";
import { getModelForClass, prop } from "@typegoose/typegoose";
@ObjectType()
export class LikesMap {
    @Field()
    @prop({ required: false })
    userID: string;

    @Field()
    @prop({ required: false })
    postID: string;
}

export const LikesMapModel = getModelForClass(LikesMap);
