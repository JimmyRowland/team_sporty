import { ObjectType, Field } from "type-graphql";
import { prop, Ref } from "@typegoose/typegoose";
import { User } from "./User";
import { CreationAndModificationDate } from "./CreationAndModificationDate";
@ObjectType()
export class Comment extends CreationAndModificationDate {
    @Field()
    @prop({ required: true })
    content: string;

    @Field(() => User)
    @prop({ Ref: User, required: true })
    user: Ref<User>;
}
