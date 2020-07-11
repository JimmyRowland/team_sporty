import { ObjectType, Field } from "type-graphql";
import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "./User";
import { CreationAndModificationDate } from "./CreationAndModificationDate";
import { Post } from "./Post";
@ObjectType()
export class Team extends CreationAndModificationDate {
    @Field()
    @prop({ required: true })
    name: string;

    @Field(() => [User])
    @prop({ Ref: "User", required: true })
    couches: Ref<User>[];

    @Field(() => [User])
    @prop({ Ref: "User", default: [] })
    members: Ref<User>[];

    @Field(() => [Post])
    @prop({ Ref: "Post", default: [] })
    posts: Ref<Post>[];
}
export const TeamModel = getModelForClass(Team);
