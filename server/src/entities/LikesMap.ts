import { ObjectType, Field } from "type-graphql";
import { getModelForClass, prop } from "@typegoose/typegoose";
import { PostUserResponse } from "../interfaces/responseType";
import { postUserIdObject } from "../interfaces/interfaces";
@ObjectType()
export class LikesMap {
    @Field(() => PostUserResponse)
    @prop({ required: true })
    _id: postUserIdObject;
}

export const LikesMapModel = getModelForClass(LikesMap);
