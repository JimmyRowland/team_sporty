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
import { TeamCoachMapModel } from "../entities/TeamCoachMap";
import { ObjectID } from "mongodb";
import { hasUser } from "../middleware/hasUser";
import { TeamMemberMap, TeamMemberMapModel } from "../entities/TeamMemberMap";
import { User, UserModel } from "../entities/User";
import { Post } from "../entities/Post";
import { isMember } from "../middleware/isMember";
import { getIDfromToken } from "../middleware/getIDfromToken";
import { EventTypeEnum, SportEnum } from "../interfaces/enum";
import { Event } from "../entities/Event";
import { TeamUserResponse } from "../interfaces/responseType";
import { TeamApplicationPendingListModel } from "../entities/TeamApplicationPendingList";
import { isCreditCard } from "class-validator";
import { TeamInvitationPendingListModel } from "../entities/TeamInvitationPendingList";
@ObjectType()
class GetTeamsResponse {
    @Field(() => Boolean)
    isMember: boolean;
    @Field(() => Team)
    team: Team;
}

@Resolver((of) => Team)
export class TeamResolver {
    private static async isMember(userID: string, teamID: string) {
        const teamMemberPair = await TeamMemberMapModel.findOne({ "_id.team": teamID, "_id.user": userID });
        const teamCoachPair = await TeamCoachMapModel.findOne({ "_id.team": teamID, "_id.user": userID });
        if (!teamMemberPair && !teamCoachPair) {
            return false;
        }
        return true;
    }

    @Query(() => [GetTeamsResponse])
    @UseMiddleware(isAuth)
    async getTeams(@Ctx() { res, payload }: ResReq) {
        const teams = await TeamModel.find();
        const memberTeamPair = await TeamMemberMapModel.find({ "_id.user": payload._id });
        const coachTeamPair = await TeamCoachMapModel.find({ "_id.user": payload._id });
        return teams.map((team) => {
            const idString = team._id.toHexString();
            const isMember = memberTeamPair.find((pair) => {
                return pair._id.team === idString;
            });
            const isCoach = coachTeamPair.find((pair) => {
                return pair._id.team === idString;
            });
            const teamResponse = new GetTeamsResponse();
            teamResponse.isMember = !!isMember || !!isCoach;
            teamResponse.team = team;
            return teamResponse;
        });
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth, isCoach)
    async updateTeam(
        @Arg("teamID") teamID: string,
        @Arg("sport") sport: SportEnum,
        @Arg("name") name: string,
        @Ctx() { res, payload }: ResReq,
    ) {
        try {
            await TeamModel.findByIdAndUpdate(teamID, { name: name, sport: sport });
        } catch (e) {
            console.log(e);
            return false;
        }
        return true;
    }

    @Query(() => [User])
    async getMembers(@Arg("teamID") teamID: string): Promise<User[]> {
        const pairs = await TeamMemberMapModel.find({ "_id.team": teamID });
        return UserModel.find({
            _id: {
                $in: pairs.map((pair) => pair._id.user),
            },
        });
    }

    @Query(() => [User])
    async getCoaches(@Arg("teamID") teamID: string): Promise<User[]> {
        const pairs = await TeamCoachMapModel.find({
            "_id.team": teamID,
        });
        return UserModel.find({
            _id: {
                $in: pairs.map((pair) => pair._id.user),
            },
        });
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth, hasUser, hasTeam, isCoach)
    async addMember(@Arg("userID") userID: string, @Arg("teamID") teamID: string, @Ctx() { res, payload }: ResReq) {
        try {
            const input = new TeamUserResponse();
            input.team = teamID;
            input.user = userID;
            const deleted = await TeamApplicationPendingListModel.findOneAndDelete({ _id: input });
            if (deleted) {
                const teamMemberPair = new TeamMemberMapModel({
                    _id: input,
                });
                await teamMemberPair.save();
            }
        } catch (err) {
            console.log(err);
            return false;
        }
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async applyTeam(@Arg("teamID") teamID: string, @Ctx() { res, payload }: ResReq) {
        try {
            const input = new TeamUserResponse();
            input.team = teamID;
            input.user = payload._id!;
            const application = new TeamApplicationPendingListModel({
                _id: input,
            });
            await application.save();
        } catch (err) {
            console.log(err);
            return false;
        }
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth, isCoach)
    async inviteMember(@Arg("teamID") teamID: string, @Arg("userID") userID: string, @Ctx() { res, payload }: ResReq) {
        try {
            const input = new TeamUserResponse();
            input.team = teamID;
            input.user = userID;
            const invitation = new TeamInvitationPendingListModel({
                _id: input,
            });
            await invitation.save();
        } catch (err) {
            console.log(err);
            return false;
        }
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async acceptInvitation(@Arg("teamID") teamID: string, @Ctx() { res, payload }: ResReq) {
        try {
            const input = new TeamUserResponse();
            input.team = teamID;
            input.user = payload._id!;
            const deleted = await TeamInvitationPendingListModel.findOneAndDelete({ _id: input });
            if (deleted) {
                const teamMemberPair = new TeamMemberMapModel({
                    _id: input,
                });
                await teamMemberPair.save();
            }
        } catch (err) {
            console.log(err);
            return false;
        }
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth, isCoach)
    async removeMember(@Arg("userID") userID: string, @Arg("teamID") teamID: string, @Ctx() { res, payload }: ResReq) {
        try {
            await TeamMemberMapModel.findOneAndRemove({ "_id.team": teamID, "_id.user": userID });
        } catch (err) {
            console.log(err);
            return false;
        }
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth, isCoach)
    async removeCoach(@Arg("userID") userID: string, @Arg("teamID") teamID: string, @Ctx() { res, payload }: ResReq) {
        try {
            const pairs = await TeamCoachMapModel.find({ "_id.team": teamID });
            if (pairs.length > 1) {
                await TeamCoachMapModel.findOneAndRemove({ "_id.team": teamID, "_id.user": userID });
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
            return false;
        }
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth, hasUser, hasTeam, isCoach)
    async addCoach(@Arg("userID") userID: string, @Arg("teamID") teamID: string, @Ctx() { res, payload }: ResReq) {
        try {
            const teamCoachPair = new TeamCoachMapModel({
                _id: {
                    team: teamID,
                    user: userID,
                },
            });
            await teamCoachPair.save();
        } catch (err) {
            console.log(err);
            return false;
        }
        return true;
    }

    @Query(() => Team)
    getTeam(@Arg("teamID") teamID: string) {
        return TeamModel.findById(teamID);
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async newTeam(
        @Arg("name") name: string,
        @Ctx() { payload, res }: ResReq,
        @Arg("imgUrl", { nullable: true }) imgUrl: string,
        @Arg("sport", { nullable: true }) sport: SportEnum,
    ) {
        const newTeam = new TeamModel({
            name: name,
        });
        const newKeyPair = new TeamCoachMapModel({
            _id: {
                team: newTeam._id.toHexString(),
                user: payload._id,
            },
        });
        try {
            await newKeyPair.save();
            await newTeam.save();
        } catch (err) {
            console.log(err);
            return false;
        }
        return true;
    }

    @FieldResolver(() => [Post])
    @UseMiddleware(getIDfromToken)
    async posts(@Root() team: Team, @Ctx() { payload }: ResReq): Promise<Post[]> {
        let isAMember = false;
        if (payload && payload._id) {
            isAMember = await TeamResolver.isMember(team._id.toHexString(), payload._id);
        }
        const result = team.posts.filter((post) => {
            return !post.isPrivate || isAMember;
        });
        return result;
    }

    @FieldResolver(() => [Event])
    @UseMiddleware(getIDfromToken)
    async events(@Root() team: Team, @Ctx() { payload }: ResReq): Promise<Event[]> {
        let isAMember = false;
        if (payload._id) {
            isAMember = await TeamResolver.isMember(team._id.toHexString(), payload._id);
        }
        const result = team.events.filter((event) => {
            return !event.isPrivate || isAMember;
        });
        return result;
    }
}
