import { ObjectType, Field, Int, Root } from "type-graphql";
import { index, prop, Ref } from "@typegoose/typegoose";
import { User, UserModel } from "./User";
import { CreationAndModificationDate } from "./CreationAndModificationDate";
import { registerEnumType } from "type-graphql";
import { EventTypeEnum, EventUserResEnum } from "../interfaces/enum";
import { LikesMapModel } from "./LikesMap";
import { UsersResponseToEvent } from "../interfaces/responseType";
import { Team } from "./Team";
import { TeamMemberMap, TeamMemberMapModel } from "./TeamMemberMap";
import { EventUserMap, EventUserMapModel } from "./EventUserMap";

registerEnumType(EventUserResEnum, {
    name: "EventUserResEnum",
    description: "Going? Not going? No Response",
});

registerEnumType(EventTypeEnum, {
    name: "EventTypeEnum",
    description: "Type of event",
});

@ObjectType()
@index({ _id: 1 })
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

    @Field()
    @prop({ default: "" })
    address: string;

    @Field(() => Boolean)
    @prop({ default: false })
    isPrivate: boolean;

    @Field(() => [UsersResponseToEvent], { complexity: 5 })
    async usersResponse(@Root() event: Event): Promise<UsersResponseToEvent[]> {
        const pairs: EventUserMap[] = await EventUserMapModel.find({ "_id.event": event._id.toHexString() });
        const result: UsersResponseToEvent[] = [];
        for (const pair of pairs) {
            const response = new UsersResponseToEvent();
            const user = await UserModel.findById(pair._id.user);
            if (user) {
                response.user = user;
                result.push(response);
            } else {
                continue;
            }
            response.isGoing = pair.isGoing;
        }
        return result;
    }

    @Field(() => String, { complexity: 2 })
    teamID(@Root() team: Team): string {
        return team._id.toHexString();
    }
}
