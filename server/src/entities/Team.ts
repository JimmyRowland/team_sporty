import { ObjectType, Field, ID } from "type-graphql";
import { prop, Ref } from "@typegoose/typegoose";
import { User } from "./User";
@ObjectType()
export class Team {
    @Field(() => ID)
    @prop({ required: true })
    _id: string;

    @Field()
    @prop({ required: true })
    creationDate: Date;

    @Field()
    @prop({ required: true })
    lastModifyDate: Date;

    @Field()
    @prop({ required: true })
    name: string;

    @Field(() => [User], { nullable: true })
    @prop({ Ref: "User" })
    couches?: Ref<User>[];

    @Field(() => [User], { nullable: true })
    @prop({ Ref: "User" })
    members?: Ref<User>[];
}
