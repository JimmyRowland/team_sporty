import { MiddlewareFn } from "type-graphql";
import { ResReq } from "../interfaces/interfaces";
import {} from "../lib/utils";
// import { join } from "path";
// import { readFileSync } from "fs";
// import { verify, VerifyOptions } from "jsonwebtoken";
import { verify } from "jsonwebtoken";

// const pathToPubKey = join(__dirname, "..", "id_rsa_pub.pem");
// const PUB_KEY = readFileSync(pathToPubKey, "utf8");

export const isCoach: MiddlewareFn<ResReq> = ({ context }, next) => {
    console.log(context.payload);
    return next();
};
