import { Resolver, Mutation, Query, Arg, Field, Ctx, UseMiddleware, ObjectType, Root, Int } from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { Event } from "../entities/Event";
import { ResReq } from "../interfaces/interfaces";
import { isCoach } from "../middleware/isCoach";
import { EventTypeEnum, EventUserResEnum } from "../interfaces/enum";
import { Team, TeamModel } from "../entities/Team";
import { TeamMemberMap, TeamMemberMapModel } from "../entities/TeamMemberMap";
import { EventUserMapModel } from "../entities/EventUserMap";
import { TeamCoachMap, TeamCoachMapModel } from "../entities/TeamCoachMap";
import { Post } from "../entities/Post";
import { getIDfromToken } from "../middleware/getIDfromToken";
import { ObjectID } from "mongodb";
import { isMemberPayload } from "../middleware/isMemberPayload";
import { GetTeamResponse } from "../interfaces/responseType";
import { isMember } from "../middleware/isMember";

@Resolver()
export class EventResolver {
    //TODO filter nested documents using mongoose.
    @Query(() => [Event])
    @UseMiddleware(isAuth)
    async getEventsOfAllTeams(
        @Arg("skip", () => Int) skip: number,
        @Arg("limit", () => Int) limit: number,
        @Ctx() { res, payload }: ResReq,
    ): Promise<Event[]> {
        const memberTeamPair: TeamMemberMap[] = await TeamMemberMapModel.find({ "_id.user": payload._id });
        const coachTeamPair: TeamCoachMap[] = await TeamCoachMapModel.find({ "_id.user": payload._id });
        const coachTeamIDs = coachTeamPair.map((pair) => new ObjectID(pair._id.team));
        const memberTeamIDs = memberTeamPair.map((pair) => new ObjectID(pair._id.team));
        const teamIDs = coachTeamIDs.concat(memberTeamIDs);
        const startOfTheDay = new Date();
        startOfTheDay.setHours(0, 0, 0, 0);
        const teams = await TeamModel.aggregate([
            { $match: { _id: { $in: teamIDs } } },
            { $project: { events: 1 } },
            { $unwind: "$events" },
            { $match: { "events.startDate": { $gte: startOfTheDay } } },
            { $sort: { "events.startDate": 1 } },
            { $skip: skip },
            { $limit: limit },
        ]);
        return teams.map(({ events }: { events: Event; _id: string }) => events);
    }

    // TODO filter Event on startDate in aggregate
    @Query(() => [Event])
    @UseMiddleware(getIDfromToken, isMemberPayload)
    async getEventsOfOneTeam(
        @Arg("teamID") teamID: string,
        @Arg("skip", () => Int) skip: number,
        @Arg("limit", () => Int) limit: number,
        @Ctx() { res, payload }: ResReq,
    ): Promise<Event[]> {
        if (!payload.isMember) {
            return [];
        }
        const startOfTheDay = new Date();
        startOfTheDay.setHours(0, 0, 0, 0);
        const team = await TeamModel.aggregate([
            { $match: { _id: new ObjectID(teamID) } },
            { $project: { events: 1 } },
            { $unwind: "$events" },
            { $match: { "events.startDate": { $gte: startOfTheDay } } },
            { $sort: { "events.startDate": 1 } },
            { $skip: skip },
            { $limit: limit },
        ]);
        return team.map(({ events }: { events: Event; _id: string }) => events);
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth, isCoach)
    async addEvent(
        @Arg("teamID") teamID: string,
        @Arg("description") description: string,
        @Arg("name") name: string,
        @Arg("eventType") eventType: EventTypeEnum,
        @Arg("startDate") startDate: Date,
        @Arg("isPrivate") isPrivate: boolean,
        @Arg("address") address: string,
        @Ctx() { payload }: ResReq,
        @Arg("endDate") endDate?: Date,
    ) {
        const team = await TeamModel.findById(teamID);
        if (!team) return false;
        try {
            const event = new Event();
            event.startDate = startDate;
            if (endDate) {
                event.endDate = endDate;
            }
            event.description = description;
            event.name = name;
            event.eventType = eventType;
            event.address = address;
            team.events.push(event);
            await team.save();
            const memberTeamPairs: TeamMemberMap[] = await TeamMemberMapModel.find({ "_id.team": teamID });
            const coachTeamPair: TeamCoachMap[] = await TeamCoachMapModel.find({ "_id.team": teamID });
            const userIDs = new Set(
                memberTeamPairs.map((pair) => pair._id.user).concat(coachTeamPair.map((pair) => pair._id.user)),
            );
            for (const user of userIDs) {
                try {
                    const eventUserPair = new EventUserMapModel({
                        _id: { event: team.events[team.events.length - 1]._id.toHexString(), user: user },
                    });
                    await eventUserPair.save();
                } catch (e) {
                    console.log(e);
                }
            }
        } catch (e) {
            console.log(e);
            return false;
        }
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async setGoing(
        @Arg("eventID") eventID: string,
        @Arg("isGoing") isGoing: EventUserResEnum,
        @Ctx() { payload }: ResReq,
    ) {
        try {
            const eventUserMap = await EventUserMapModel.findOne({ "_id.event": eventID, "_id.user": payload._id });
            if (eventUserMap) {
                eventUserMap.isGoing = isGoing;
                await eventUserMap.save();
                return true;
            } else {
                const newResponse = new EventUserMapModel({
                    _id: { event: eventID, user: payload._id },
                    isGoing: isGoing,
                });
                await newResponse.save();
                return true;
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth, isCoach)
    async editEvent(
        @Arg("eventID") eventID: string,
        @Arg("teamID") teamID: string,
        @Arg("description") description: string,
        @Arg("name") name: string,
        @Arg("eventType") eventType: EventTypeEnum,
        @Arg("startDate") startDate: Date,
        @Arg("isPrivate") isPrivate: boolean,
        @Ctx() { payload }: ResReq,
        @Arg("endDate", { nullable: true }) endDate: Date,
    ) {
        try {
            await TeamModel.findByIdAndUpdate(
                teamID,
                {
                    $set: {
                        "event.$[element].description": description,
                        "event.$[element].name": name,
                        "event.$[element].eventType": eventType,
                        "event.$[element].startDate": startDate,
                        "event.$[element].isPrivate": isPrivate,
                        "event.$[element].endDate": endDate,
                    },
                },
                { arrayFilters: [{ "element._id": eventID }] },
            );
        } catch (e) {
            console.log(e);
            return false;
        }
        return true;
    }
}
