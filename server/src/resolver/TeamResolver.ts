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
import { GetMembersResponse, GetTeamResponse, GetTeamsResponse, TeamUserResponse } from "../interfaces/responseType";
import { TeamApplicationPendingList, TeamApplicationPendingListModel } from "../entities/TeamApplicationPendingList";
import { TeamInvitationPendingListModel } from "../entities/TeamInvitationPendingList";
import { isMember } from "../middleware/isMember";
import { isCoachPayload } from "../middleware/isCoachPayload";

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
    @UseMiddleware(getIDfromToken)
    async getTeams(@Ctx() { res, payload }: ResReq) {
        const teams: Team[] = await TeamModel.find();
        const memberTeamPair: TeamMemberMap[] = await TeamMemberMapModel.find({ "_id.user": payload._id });
        const coachTeamPair: TeamCoachMap[] = await TeamCoachMapModel.find({ "_id.user": payload._id });
        const applicantTeamPair: TeamCoachMap[] = await TeamApplicationPendingListModel.find({
            "_id.user": payload._id,
        });
        return teams.map((team) => {
            const idString = team._id.toHexString();
            const isMember = memberTeamPair.find((pair) => {
                return pair._id.team === idString;
            });
            const isCoach = coachTeamPair.find((pair) => {
                return pair._id.team === idString;
            });
            const isPending = applicantTeamPair.find((pair) => {
                return pair._id.team === idString;
            });
            const teamResponse = new GetTeamsResponse();
            teamResponse.isMember = !!isMember || !!isCoach;
            teamResponse.team = team;
            teamResponse.isCoach = !!isCoach;
            teamResponse.isPending = !!isPending;
            return teamResponse;
        });
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth, isCoach)
    async updateTeam(
        @Arg("teamID") teamID: string,
        @Arg("sport") sport: SportEnum,
        @Arg("name") name: string,
        @Arg("description") description: string,
        @Ctx()
        { res, payload }: ResReq,
    ) {
        try {
            await TeamModel.findByIdAndUpdate(teamID, { name: name, sport: sport, description: description });
        } catch (e) {
            console.log(e);
            return false;
        }
        return true;
    }

    @Query(() => [User])
    @UseMiddleware(isAuth, isCoach)
    async getPendings(@Arg("teamID") teamID: string): Promise<User[]> {
        const pairs: TeamApplicationPendingList[] = await TeamApplicationPendingListModel.find({ "_id.team": teamID });
        return UserModel.find({
            _id: {
                $in: pairs.map((pair) => pair._id.user),
            },
        });
    }

    @Query(() => GetMembersResponse)
    @UseMiddleware(isAuth, isMember, isCoachPayload)
    async getCoaches(@Arg("teamID") teamID: string, @Ctx() { res, payload }: ResReq): Promise<GetMembersResponse> {
        const pairs: TeamCoachMap[] = await TeamCoachMapModel.find({
            "_id.team": teamID,
        });
        const users = await UserModel.find({
            _id: {
                $in: pairs.map((pair) => pair._id.user),
            },
        });
        const response = new GetMembersResponse();
        response.isCoach = !!payload.isCoach;
        response.users = users;
        return response;
    }

    @Query(() => GetMembersResponse)
    @UseMiddleware(isAuth, isMember, isCoachPayload)
    async getMembers(@Arg("teamID") teamID: string, @Ctx() { res, payload }: ResReq): Promise<GetMembersResponse> {
        const pairs: TeamMemberMap[] = await TeamMemberMapModel.find({ "_id.team": teamID });
        const users = await UserModel.find({
            _id: {
                $in: pairs.map((pair) => pair._id.user),
            },
        });
        const response = new GetMembersResponse();
        response.isCoach = !!payload.isCoach;
        response.users = users;
        return response;
    }

    @Query(() => [Team])
    @UseMiddleware(isAuth)
    async getMyTeams(@Ctx() { res, payload }: ResReq): Promise<Team[]> {
        const memberPairs: TeamMemberMap[] = await TeamMemberMapModel.find({
            "_id.user": payload._id,
        });
        const coachPairs: TeamCoachMap[] = await TeamCoachMapModel.find({
            "_id.user": payload._id,
        });
        const teamIDs = memberPairs.map((pair) => pair._id.team).concat(coachPairs.map((pair) => pair._id.team));
        return TeamModel.find({
            _id: {
                $in: teamIDs,
            },
        });
    }

    @Query(() => [Team])
    @UseMiddleware(isAuth)
    async getTeamsAsCoach(@Ctx() { res, payload }: ResReq): Promise<Team[]> {
        const coachPairs: TeamCoachMap[] = await TeamCoachMapModel.find({
            "_id.user": payload._id,
        });
        const teamIDs = coachPairs.map((pair) => pair._id.team);
        return TeamModel.find({
            _id: {
                $in: teamIDs,
            },
        });
    }

    @Query(() => [Team])
    @UseMiddleware(isAuth)
    async getTeamsAsMember(@Ctx() { res, payload }: ResReq): Promise<Team[]> {
        const memberPairs: TeamMemberMap[] = await TeamMemberMapModel.find({
            "_id.user": payload._id,
        });
        const teamIDs = memberPairs.map((pair) => pair._id.team);
        return TeamModel.find({
            _id: {
                $in: teamIDs,
            },
        });
    }

    @Query(() => [GetTeamResponse])
    @UseMiddleware(isAuth)
    async getTeamsAsMemberOrCoach(@Ctx() { res, payload }: ResReq): Promise<GetTeamResponse[]> {
        const memberTeamPair: TeamMemberMap[] = await TeamMemberMapModel.find({ "_id.user": payload._id });
        const coachTeamPair: TeamCoachMap[] = await TeamCoachMapModel.find({ "_id.user": payload._id });
        const coachTeamIDs = coachTeamPair.map((pair) => pair._id.team);
        const memberTeamIDs = memberTeamPair.map((pair) => pair._id.team);
        const teamIDs = coachTeamIDs.concat(memberTeamIDs);
        const teams: Team[] = await TeamModel.find({
            _id: {
                $in: teamIDs,
            },
        });
        const response: GetTeamResponse[] = [];
        for (const team of teams) {
            const getTeamResponse = new GetTeamResponse();
            getTeamResponse.team = team;
            getTeamResponse.isCoach = coachTeamIDs.includes(team._id.toHexString());
            response.push(getTeamResponse);
        }
        return response;
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
    @UseMiddleware(isAuth, isCoach)
    async addMembers(
        @Arg("userIDs", () => [String]) userIDs: string[],
        @Arg("teamID") teamID: string,
        @Ctx() { res, payload }: ResReq,
    ) {
        try {
            for (const userID of userIDs) {
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
            }
        } catch (err) {
            console.log(err);
            return false;
        }
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth, isCoach)
    async rejectMembers(
        @Arg("userIDs", () => [String]) userIDs: string[],
        @Arg("teamID") teamID: string,
        @Ctx() { res, payload }: ResReq,
    ) {
        try {
            const ids = userIDs.map((userID) => {
                return { team: teamID, user: userID };
            });
            await TeamApplicationPendingListModel.remove({ _id: { $in: ids } });
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
    @UseMiddleware(isAuth)
    async quitTeamAsMember(@Arg("teamID") teamID: string, @Ctx() { res, payload }: ResReq) {
        try {
            await TeamMemberMapModel.findOneAndRemove({ "_id.team": teamID, "_id.user": payload._id });
        } catch (err) {
            console.log(err);
            return false;
        }
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth, isCoach)
    async removeMembers(
        @Arg("userIDs", () => [String]) userIDs: string[],
        @Arg("teamID") teamID: string,
        @Ctx() { res, payload }: ResReq,
    ) {
        try {
            const ids = userIDs.map((userID) => {
                return { team: teamID, user: userID };
            });
            await TeamMemberMapModel.remove({ _id: { $in: ids } });
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
    @UseMiddleware(isAuth, isCoach)
    async quitTeamAsCoach(@Arg("teamID") teamID: string, @Ctx() { res, payload }: ResReq) {
        try {
            const pairs = await TeamCoachMapModel.find({ "_id.team": teamID });
            if (pairs.length > 1) {
                await TeamCoachMapModel.findOneAndRemove({ "_id.team": teamID, "_id.user": payload._id });
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

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth, isCoach)
    async addCoaches(
        @Arg("userIDs", () => [String]) userIDs: string[],
        @Arg("teamID") teamID: string,
        @Ctx() { res, payload }: ResReq,
    ) {
        try {
            for (const userID of userIDs) {
                const teamCoachPair = new TeamCoachMapModel({
                    _id: {
                        team: teamID,
                        user: userID,
                    },
                });
                await teamCoachPair.save();
            }
        } catch (err) {
            console.log(err);
            return false;
        }
        return true;
    }

    @Query(() => GetTeamResponse)
    @UseMiddleware(getIDfromToken)
    async getTeam(@Arg("teamID") teamID: string, @Ctx() { res, payload }: ResReq): Promise<GetTeamResponse> {
        const team = await TeamModel.findById(teamID);
        const coachTeamPair: TeamCoachMap[] = await TeamCoachMapModel.find({ "_id.user": payload._id });
        const result = new GetTeamResponse();
        const isCoach = coachTeamPair.find((pair) => {
            return pair._id.team === team?._id.toHexString();
        });
        result.isCoach = !!isCoach;
        result.team = team!;
        return result;
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
        const result = team.posts
            .filter((post) => {
                return !post.isPrivate || isAMember;
            })
            .sort((post1, post2) => post2.lastModifyDate.getTime() - post1.lastModifyDate.getTime());
        return result;
    }

    @FieldResolver(() => [Event])
    @UseMiddleware(getIDfromToken)
    async events(@Root() team: Team, @Ctx() { payload }: ResReq): Promise<Event[]> {
        let isAMember = false;
        if (payload._id) {
            isAMember = await TeamResolver.isMember(team._id.toHexString(), payload._id);
        }
        const result = team.events
            .filter((event) => {
                return !event.isPrivate || isAMember;
            })
            .sort((event1, event2) => event2.lastModifyDate.getTime() - event1.lastModifyDate.getTime());
        return result;
    }
}
