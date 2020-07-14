import { ObjectType, Field, Int } from "type-graphql";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { CreationAndModificationDate } from "./CreationAndModificationDate";
import { defaultAvatarUrl, defaultBannerUrl } from "../interfaces/const";
@ObjectType()
export class User extends CreationAndModificationDate {
    @Field()
    @prop({ required: true })
    lastLoginDate: Date;

    @Field()
    @prop({ required: true })
    name: string;

    @Field()
    @prop({ required: true, unique: true })
    email: string;

    @prop({ required: true })
    salt: string;

    @prop({ required: true })
    hash: string;

    @Field(() => [String])
    @prop({ default: [] })
    teamID?: string[];

    @Field(() => Int)
    @prop({ default: 0 })
    tokenVersion: number;

    @Field(() => [String])
    @prop({ default: [] })
    ip: string[];

    @Field()
    @prop({
        default: defaultBannerUrl,
    })
    bannerUrls: string;

    @Field()
    @prop({
        default: defaultAvatarUrl,
    })
    avatarUrl: string;

    @prop({ default: true })
    verified: true;
}

export const UserModel = getModelForClass(User);
