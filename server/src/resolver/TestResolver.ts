import {
    Resolver,
    Mutation,
    Query,
    Arg,
    Ctx,
    UseMiddleware,
    FieldResolver,
    Root,
    ObjectType,
    Field,
} from "type-graphql";
import { ResReq } from "../interfaces/interfaces";
import { isAuth } from "../middleware/isAuth";
import { Team, TeamModel } from "../entities/Team";
import { isCoach } from "../middleware/isCoach";
import { hasTeam } from "../middleware/hasTeam";
import { TeamCoachMap, TeamCoachMapModel } from "../entities/TeamCoachMap";
import { ObjectID } from "mongodb";
import { hasUser } from "../middleware/hasUser";
import { TeamMemberMap, TeamMemberMapModel } from "../entities/TeamMemberMap";
import { User, UserModel } from "../entities/User";
import { Post } from "../entities/Post";
import { getIDfromToken } from "../middleware/getIDfromToken";
import { EventTypeEnum, SportEnum } from "../interfaces/enum";
import { Event } from "../entities/Event";
import { TeamUserResponse } from "../interfaces/responseType";
import { TeamApplicationPendingList, TeamApplicationPendingListModel } from "../entities/TeamApplicationPendingList";
import { TeamInvitationPendingListModel } from "../entities/TeamInvitationPendingList";
@ObjectType()
class GetTeamsResponse {
    @Field(() => Boolean)
    isMember: boolean;
    @Field(() => Boolean)
    isCoach: boolean;
    @Field(() => Team)
    team: Team;
}

@ObjectType()
class GetTeamResponse {
    @Field(() => Boolean)
    isCoach: boolean;
    @Field(() => Team)
    team: Team;
}

@Resolver((of) => Team)
export class TestResolver {
    @Mutation(() => Boolean)
    async allUserApplyTeam(@Arg("teamID") teamID: string) {
        try {
            const users = await UserModel.find();
            for (const user of users) {
                const input = new TeamUserResponse();
                input.team = teamID;
                input.user = user._id.toHexString();
                const application = new TeamApplicationPendingListModel({
                    _id: input,
                });
                await application.save();
            }
        } catch (err) {
            console.log(err);
            return false;
        }
        return true;
    }
}
