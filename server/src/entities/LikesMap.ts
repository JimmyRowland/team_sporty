import { ObjectType, Field } from "type-graphql";
import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { PostUserResponse } from "../interfaces/responseType";
import { postUserIdObject } from "../interfaces/interfaces";
import { User } from "./User";
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
