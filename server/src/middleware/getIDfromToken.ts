import { MiddlewareFn } from "type-graphql";
import { ResReq } from "../interfaces/interfaces";
import { verify } from "jsonwebtoken";

export const getIDfromToken: MiddlewareFn<ResReq> = ({ context }, next) => {
    const authorization = context.req.headers["authorization"];
    if (!authorization) {
        return next();
    }
    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
        context.payload = payload as { _id: string };
    } catch (err) {
        return next();
    }
    return next();
};
