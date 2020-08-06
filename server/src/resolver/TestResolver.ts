import { Arg, Mutation, Resolver } from "type-graphql";
import { Team, TeamModel } from "../entities/Team";
import { UserModel } from "../entities/User";
import { TeamUserResponse } from "../interfaces/responseType";
import { TeamApplicationPendingListModel } from "../entities/TeamApplicationPendingList";

// For testing purpose
// @ObjectType()
// class GetTeamsResponse {
//     @Field(() => Boolean)
//     isMember: boolean;
//     @Field(() => Boolean)
//     isCoach: boolean;
//     @Field(() => Team)
//     team: Team;
// }
//
// @ObjectType()
// class GetTeamResponse {
//     @Field(() => Boolean)
//     isCoach: boolean;
//     @Field(() => Team)
//     team: Team;
// }

@Resolver(() => Team)
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

    @Mutation(() => Boolean)
    async removeAllEvent() {
        try {
            const teams = await TeamModel.find();
            for (const team of teams) {
                team.events = [];
                team.save();
            }
        } catch (err) {
            console.log(err);
            return false;
        }
        return true;
    }
}
