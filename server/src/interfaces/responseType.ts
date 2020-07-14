import { Field, ObjectType } from "type-graphql";
import { Team } from "../entities/Team";
import { User } from "../entities/User";
import { Post } from "../entities/Post";

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
