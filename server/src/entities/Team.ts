import { ObjectType, Field } from "type-graphql";
import { getModelForClass, prop } from "@typegoose/typegoose";
import { CreationAndModificationDate } from "./CreationAndModificationDate";
import { Post } from "./Post";
import { Event } from "./Event";
import { SportEnum } from "../interfaces/enum";
import { registerEnumType } from "type-graphql";
import { defaultBannerUrl } from "../interfaces/const";

registerEnumType(SportEnum, {
    name: "Sport",
    description: "Types of sports",
});
@ObjectType()
export class Team extends CreationAndModificationDate {
    @Field()
    @prop({ required: true })
    name: string;

    @Field(() => [Post], { nullable: true })
    @prop({ items: Post, default: [] })
    posts: Post[];

    @Field(() => [Event], { nullable: true })
    @prop({ items: Event, default: [] })
    events: Event[];

    @Field(() => SportEnum)
    @prop({ items: SportEnum, default: SportEnum.unspecified })
    sport: SportEnum;

    @Field({ nullable: true })
    @prop({ default: defaultBannerUrl })
    imgUrl: string;
}
export const TeamModel = getModelForClass(Team);
