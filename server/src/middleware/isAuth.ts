import { MiddlewareFn } from "type-graphql";
import { ResReq } from "../interfaces/interfaces";
import { verify } from "jsonwebtoken";

export const isAuth: MiddlewareFn<ResReq> = ({ context }, next) => {
    const authorization = context.req.headers["authorization"];
    if (!authorization) {
        throw new Error("not authenticated header");
    }
    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
        context.payload = payload as { _id: string };
    } catch (err) {
        console.log(err);
        throw new Error("not authenticated");
    }

    return next();
};
