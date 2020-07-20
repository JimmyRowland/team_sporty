import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

// import { createConnection } from "typeorm";
import cookieParser from "cookie-parser";
import cors from "cors";
// import { User } from "./models/User";
// import { sendRefreshToken } from "./sendRefreshToken";
// import { createAccessToken, createRefreshToken } from "./auth";
import connectDatabase from "./config/database";
import { UserResolver } from "./resolver/UserResolver";
import { EventResolver } from "./resolver/EventResolver";
import {MessageResolver} from "./resolver/MessageResolver"
import {UserUploadResolver} from "./resolver/UserUploadResolver";
import { json } from 'express';
(async () => {
    const app = express();
    connectDatabase();
    app.use(
        cors({
            origin: "http://localhost:3000",
            credentials: true,
        }),
    );
    app.use(cookieParser());
    app.use(json( { limit: '50mb' } ) );
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, EventResolver, MessageResolver, UserUploadResolver],
        }),
        context: ({ req, res }) => ({ req, res }),
    });

    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(4000, () => {
        console.log("express server started on http://localhost:4000/graphql");
    });
})();
