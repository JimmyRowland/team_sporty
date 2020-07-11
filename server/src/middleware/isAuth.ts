import { MiddlewareFn } from "type-graphql";
import { ResReq } from "../interfaces/interfaces";
import {} from "../lib/utils";
// import { join } from "path";
// import { readFileSync } from "fs";
// import { verify, VerifyOptions } from "jsonwebtoken";
import { verify } from "jsonwebtoken";

// const pathToPubKey = join(__dirname, "..", "id_rsa_pub.pem");
// const PUB_KEY = readFileSync(pathToPubKey, "utf8");

export const isAuth: MiddlewareFn<ResReq> = ({ context }, next) => {
    const authorization = context.req.headers["authorization"];
    // console.log(context.req.headers);
    if (!authorization) {
        throw new Error("not authenticated header");
    }

    try {
        // const options: VerifyOptions = {
        //     algorithms: ["RS256"],
        // };
        const token = authorization.split(" ")[1];
        // console.log(token);
        // const payload = verify(token, PUB_KEY!, options);
        const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);

        context.payload = payload as { _id: string };
    } catch (err) {
        console.log(err);
        throw new Error("not authenticated");
    }

    return next();
};
