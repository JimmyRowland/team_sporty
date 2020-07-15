import { ObjectType, Field } from "type-graphql";
import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "./User";
import { registerEnumType } from "type-graphql";
import { EventUserResEnum } from "../interfaces/enum";
import { EventUserResponse, TeamUserResponse } from "../interfaces/responseType";
import { eventUserObject, teamUserIdObject } from "../interfaces/interfaces";
import { TeamCoachMap } from "./TeamCoachMap";

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
