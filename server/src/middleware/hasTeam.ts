import { MiddlewareFn } from "type-graphql";
import { ResReq } from "../interfaces/interfaces";
import { TeamModel } from "../entities/Team";

export const hasTeam: MiddlewareFn<ResReq> = async ({ context, args }, next) => {
    const team = await TeamModel.findOne({ _id: args.teamID });
    if (!team) {
        throw Error("Team not found");
    } else {
        context.payload.team = team;
    }
    return next();
};
