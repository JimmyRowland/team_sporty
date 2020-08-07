import { ObjectType, Field, Int, Root } from "type-graphql";
import { getModelForClass, prop } from "@typegoose/typegoose";
import { CreationAndModificationDate } from "./CreationAndModificationDate";
import { Post } from "./Post";
import { Event } from "./Event";
import { SportEnum } from "../interfaces/enum";
import { registerEnumType } from "type-graphql";
import { defaultBannerUrl } from "../interfaces/const";
import { TeamMemberMapModel } from "./TeamMemberMap";
import { TeamCoachMapModel } from "./TeamCoachMap";

registerEnumType(SportEnum, {
    name: "Sport",
    description: "Types of sports",
});
@ObjectType()
export class Team extends CreationAndModificationDate {
    @Field()
    @prop({ required: true })
    name: string;

    @Field()
    @prop({ default: "" })
    description: string;

    @Field(() => [Post], { nullable: true })
    @prop({ items: Post, default: [] })
    posts: Post[];

    @Field(() => [Event], { nullable: true })
    @prop({ items: Event, default: [] })
    events: Event[];

    @Field(() => SportEnum)
    @prop({ default: SportEnum.unspecified })
    sport: SportEnum;

    @Field()
    @prop({ default: defaultBannerUrl })
    imgUrl: string;

    @Field(() => Int, { complexity: 4 })
    async numberMembers(@Root() team: Team): Promise<number> {
        const memberpairs = await TeamMemberMapModel.find({ "_id.team": team._id.toHexString() });
        const coachpairs = await TeamCoachMapModel.find({ "_id.team": team._id.toHexString() });
        return memberpairs.length + coachpairs.length;
    }
}
export const TeamModel = getModelForClass(Team);
