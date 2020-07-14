import { MiddlewareFn } from "type-graphql";
import { ResReq } from "../interfaces/interfaces";
import { UserModel } from "../entities/User";

export const hasUser: MiddlewareFn<ResReq> = async ({ context, args }, next) => {
    const user = await UserModel.findById(args.userID);
    if (!user) {
        throw Error("User not found");
    } else {
        context.payload.member = user;
    }
    return next();
};
