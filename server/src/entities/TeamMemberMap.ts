import { ObjectType, Field } from "type-graphql";
import { getModelForClass, prop } from "@typegoose/typegoose";
import { TeamUserResponse } from "../interfaces/responseType";
import { teamUserIdObject } from "../interfaces/interfaces";
@ObjectType()
export class TeamMemberMap {
    @Field(() => TeamUserResponse)
    @prop({ items: TeamUserResponse, required: true })
    _id: teamUserIdObject;

    @prop({ default: new Date() })
    creationDate: Date;
}

export const TeamMemberMapModel = getModelForClass(TeamMemberMap);
