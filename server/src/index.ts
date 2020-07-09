import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

// import { createConnection } from "typeorm";
import cookieParser from "cookie-parser";
// import cors from "cors";
// import { User } from "./models/User";
// import { sendRefreshToken } from "./sendRefreshToken";
// import { createAccessToken, createRefreshToken } from "./auth";
import connectDatabase from "./config/database";
import { UserResolver } from "./resolver/UserResolver";

(async () => {
    const app = express();
    connectDatabase();
    // app.use(
    //     cors({
    //         origin: "http://localhost:3000",
    //         credentials: true,
    //     }),
    // );
    app.use(cookieParser());
    // app.get("/", (_req, res) => res.send("hello"));
    // app.post("/refresh_token", async (req, res) => {
    //     const token = req.cookies.jid;
    //     if (!token) {
    //         return res.send({ ok: false, accessToken: "" });
    //     }
    //
    //     let payload: any = null;
    //     try {
    //         payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    //     } catch (err) {
    //         console.log(err);
    //         return res.send({ ok: false, accessToken: "" });
    //     }
    //
    //     // token is valid and
    //     // we can send back an access token
    //     const user = await User.findOne({ id: payload.userId });
    //
    //     if (!user) {
    //         return res.send({ ok: false, accessToken: "" });
    //     }
    //
    //     if (user.tokenVersion !== payload.tokenVersion) {
    //         return res.send({ ok: false, accessToken: "" });
    //     }
    //
    //     sendRefreshToken(res, createRefreshToken(user));
    //
    //     return res.send({ ok: true, accessToken: createAccessToken(user) });
    // });

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver],
        }),
        context: ({ req, res }) => ({ req, res }),
    });

    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(4000, () => {
        console.log("express server started on http://localhost:4000/graphql");
    });
})();
