import { Field, ObjectType } from "type-graphql";
import { Team } from "../entities/Team";
import { User } from "../entities/User";
import { Post } from "../entities/Post";
import { Event } from "../entities/Event";
import { EventUserResEnum } from "./enum";

@ObjectType()
export class TeamUserResponse {
    @Field(() => String)
    team: string;
    @Field(() => User)
    user: string;
}

@ObjectType()
export class PostUserResponse {
    @Field(() => Post)
    post: Post | null;
    @Field(() => User)
    user: User | null;
}

@ObjectType()
export class LikedPostResponse {
    @Field(() => Boolean)
    isLiked: boolean;
    @Field(() => Number)
    likedNum: number;
}

@ObjectType()
export class EventUserResponse {
    @Field(() => Event)
    post: Event;
    @Field(() => User)
    user: User;
}

@ObjectType()
export class LoginResponse {
    @Field()
    accessToken: string;
    @Field(() => User)
    user: User | null;
}

@ObjectType()
export class GetTeamsResponse {
    @Field(() => Boolean)
    isMember: boolean;
    @Field(() => Boolean)
    isCoach: boolean;
    @Field(() => Boolean)
    isPending: boolean;
    @Field(() => Team)
    team: Team;
}

@ObjectType()
export class GetTeamResponse {
    @Field(() => Boolean)
    isCoach: boolean;
    @Field(() => Team)
    team: Team;
}

@ObjectType()
export class GetMembersResponse {
    @Field(() => Boolean)
    isCoach: boolean;
    @Field(() => [User])
    users: User[];
}

@ObjectType()
export class UsersResponseToEvent {
    @Field(() => EventUserResEnum)
    isGoing: EventUserResEnum;
    @Field(() => User)
    user: User;
}
