import { ObjectType, Field } from "type-graphql";
import { prop, Ref } from "@typegoose/typegoose";
import { User } from "./User";
import { registerEnumType } from "type-graphql";
import { EventUserResEnum } from "../interfaces/enum";

registerEnumType(EventUserResEnum, {
    name: "EventUserResEnum",
    description: "Going? Not going? No Response",
});

@ObjectType()
export class EventUserRe {
    @Field(() => User)
    @prop({ Ref: User, required: true })
    user: Ref<User>;

    @Field(() => EventUserResEnum)
    @prop({ default: EventUserResEnum.noResponse })
    isGoing: EventUserResEnum;
}
