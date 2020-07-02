import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { Interfaces } from "../interfaces/MyContext";
import {} from "./utils";

export const isAuth: MiddlewareFn<Interfaces> = ({ context }, next) => {
    const userId = context.req.body["_id"];

    if (!userId) {
        throw new Error("not authenticated");
    }

    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
        context.payload = payload as any;
    } catch (err) {
        console.log(err);
        throw new Error("not authenticated");
    }

    return next();
};
