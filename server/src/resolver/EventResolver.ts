import { Resolver, Mutation, Query, Arg, Field, Ctx, UseMiddleware, ObjectType } from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { Event } from "../entities/Event";
import { ResReq } from "../interfaces/interfaces";
import { isCoach } from "../middleware/isCoach";
import { EventTypeEnum, EventUserResEnum } from "../interfaces/enum";
import { TeamModel } from "../entities/Team";
import { TeamMemberMapModel } from "../entities/TeamMemberMap";
import { EventUserMapModel } from "../entities/EventUserMap";
import { TeamCoachMapModel } from "../entities/TeamCoachMap";

@Resolver()
export class EventResolver {
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth, isCoach)
    async addEvent(
        @Arg("teamID") teamID: string,
        @Arg("description") description: string,
        @Arg("name") name: string,
        @Arg("eventType") eventType: EventTypeEnum,
        @Arg("startDate") startDate: Date,
        @Arg("isPrivate") isPrivate: boolean,
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
            team.events.push(event);
            await team.save();
            const memberTeamPairs = await TeamMemberMapModel.find({ "_id.team": teamID });
            for (const {
                _id: { user },
            } of memberTeamPairs) {
                try {
                    const eventUserPair = new EventUserMapModel({
                        _id: { event: event._id, user: user },
                    });
                    await eventUserPair.save();
                } catch (e) {
                    console.log(e);
                }
            }
            const coachTeamPairs = await TeamCoachMapModel.find({ "_id.team": teamID });
            for (const {
                _id: { user },
            } of coachTeamPairs) {
                try {
                    const eventUserPair = new TeamCoachMapModel({
                        _id: { event: event._id, user: user },
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
        @Arg("teamID") teamID: string,
        @Arg("eventID") eventID: string,
        @Arg("isGoing") isGoing: EventUserResEnum,
        @Ctx() { payload }: ResReq,
    ) {
        await EventUserMapModel.findOneAndUpdate(
            { "_id.event": eventID, "_id.user": payload._id },
            {
                isGoing: isGoing,
            },
        );
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
