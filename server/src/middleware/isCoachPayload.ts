import { MiddlewareFn } from "type-graphql";
import { ResReq } from "../interfaces/interfaces";
import { TeamCoachMapModel } from "../entities/TeamCoachMap";

export const isCoachPayload: MiddlewareFn<ResReq> = async ({ context: { payload }, args }, next) => {
    const teamCoachPair = await TeamCoachMapModel.findOne({ "_id.team": args.teamID, "_id.user": payload._id });
    if (teamCoachPair) {
        payload.isCoach = true;
    }
    return next();
};
