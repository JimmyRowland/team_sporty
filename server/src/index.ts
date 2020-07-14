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
// import { EventResolver } from "./resolver/EventResolver";
// import { PostResolver } from "./resolver/PostResolver";
import routes from "./routes/index";
import { TeamResolver } from "./resolver/TeamResolver";
import { TypegooseMiddleware } from "./middleware/typegooseMiddleware";
import { PostResolver } from "./resolver/PostResolver";
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

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, TeamResolver, PostResolver],
            globalMiddlewares: [TypegooseMiddleware],
        }),
        context: ({ req, res }) => ({ req, res }),
    });

    apolloServer.applyMiddleware({ app, cors: false });
    app.use(routes);
    app.listen(4000, () => {
        console.log("express server started on http://localhost:4000/graphql");
    });
})();
