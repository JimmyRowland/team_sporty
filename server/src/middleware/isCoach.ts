import { MiddlewareFn } from "type-graphql";
import { ResReq } from "../interfaces/interfaces";
import { TeamCoachMapModel } from "../entities/TeamCoachMap";

export const isCoach: MiddlewareFn<ResReq> = async ({ context: { payload }, args }, next) => {
    const teamCoachPair = await TeamCoachMapModel.findOne({ "_id.team": args.teamID, "_id.user": payload._id });
    if (!teamCoachPair) {
        throw Error("Not authorized");
    }
    return next();
};
