import { ObjectType, Field } from "type-graphql";
import { getModelForClass, prop } from "@typegoose/typegoose";
import { registerEnumType } from "type-graphql";
import { EventUserResEnum } from "../interfaces/enum";
import { EventUserResponse } from "../interfaces/responseType";
import { eventUserObject } from "../interfaces/interfaces";

registerEnumType(EventUserResEnum, {
    name: "EventUserResEnum",
    description: "Going? Not going? No Response",
});

@ObjectType()
export class EventUserMap {
    @Field(() => EventUserResponse)
    @prop({ required: true })
    _id: eventUserObject;

    @Field(() => EventUserResEnum)
    @prop({ default: EventUserResEnum.noResponse })
    isGoing: EventUserResEnum;
}
export const EventUserMapModel = getModelForClass(EventUserMap);
