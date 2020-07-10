import { ObjectType, Field, Int } from "type-graphql";
import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { User } from "./User";
import { CreationAndModificationDate } from "./CreationAndModificationDate";
@ObjectType()
export class Event extends CreationAndModificationDate {
    @Field()
    @prop({ required: true })
    startDate: Date;

    @Field(() => Int, { nullable: true })
    hour: number;

    @Field(() => String)
    @prop({ required: true })
    description: string;

    @Field(() => String)
    @prop({ required: true })
    name: string;

    @Field(() => User, { nullable: true })
    @prop({ Ref: "User" })
    going?: Ref<User>[];

    @Field(() => User, { nullable: true })
    @prop({ Ref: "User" })
    notgoing?: Ref<User>[];

    @Field(() => User, { nullable: true })
    @prop({ Ref: "User" })
    pending?: Ref<User>[];
}

export const EventModel = getModelForClass(Event);
