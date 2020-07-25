import { ObjectType, Field } from "type-graphql";
import { getModelForClass, prop } from "@typegoose/typegoose";
import { TeamUserResponse } from "../interfaces/responseType";
import { teamUserIdObject } from "../interfaces/interfaces";

@ObjectType()
export class TeamApplicationPendingList {
    @Field(() => TeamUserResponse)
    @prop({ required: true })
    _id: teamUserIdObject;

    @prop({ default: new Date() })
    creationDate: Date;
}

export const TeamApplicationPendingListModel = getModelForClass(TeamApplicationPendingList);
