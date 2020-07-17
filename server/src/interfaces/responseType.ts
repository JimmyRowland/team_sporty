import { Field, ObjectType } from "type-graphql";
import { Team } from "../entities/Team";
import { User } from "../entities/User";
import { Post } from "../entities/Post";
import { Event } from "../entities/Event";

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
