import { Arg, Ctx, FieldResolver, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { Comment } from "../entities/Comment";
import { User, UserModel } from "../entities/User";
import { ResReq } from "../interfaces/interfaces";
import { isAuth } from "../middleware/isAuth";
import { isCoach } from "../middleware/isCoach";
import { TeamModel } from "../entities/Team";
import { Schema } from "mongoose";
import { ObjectID } from "mongodb";
import { post } from "@typegoose/typegoose";

@Resolver(() => Comment)
export class CommentResolver {
    @FieldResolver(() => User)
    async user(@Root() comment: Comment, @Ctx() { payload }: ResReq): Promise<User> {
        const user = await UserModel.findById(comment.user);
        if (user) {
            return user;
        } else {
            throw new Error("User not found");
        }
    }

    @Query(() => [Comment])
    @UseMiddleware(isAuth, isCoach)
    async getComments(
        @Arg("teamID") teamID: string,
        @Arg("postID") postID: string,
        @Ctx() { payload }: ResReq,
    ): Promise<Comment[]> {
        try {
            const comments0 = await TeamModel.aggregate([
                { $match: { _id: new ObjectID(teamID) } },
                { $unwind: "$posts" },
                { $match: { "posts._id": new ObjectID(postID) } },
            ]);
            return comments0![0].posts.comments;
        } catch (error) {
            console.log(error);
            throw new Error("post not found");
        }
    }
}