import { ObjectType, Field, Int, Root } from "type-graphql";
import { prop, Ref } from "@typegoose/typegoose";
import { User } from "./User";
import { CreationAndModificationDate } from "./CreationAndModificationDate";
import { registerEnumType } from "type-graphql";
import { EventTypeEnum, EventUserResEnum } from "../interfaces/enum";

registerEnumType(EventUserResEnum, {
    name: "EventUserResEnum",
    description: "Going? Not going? No Response",
});

registerEnumType(EventTypeEnum, {
    name: "EventTypeEnum",
    description: "Type of event",
});

@ObjectType()
export class Event extends CreationAndModificationDate {
    @Field()
    @prop({ required: true })
    startDate: Date;

    @Field({ nullable: true })
    @prop()
    endDate: Date;

    @Field(() => String)
    @prop({ required: true })
    description: string;

    @Field(() => String)
    @prop({ required: true })
    name: string;

    @Field(() => EventTypeEnum)
    @prop({ default: EventTypeEnum.training })
    eventType: EventTypeEnum;

    @Field(() => Boolean)
    @prop({ default: false })
    isPrivate: boolean;
}
