import { Arg, Ctx, FieldResolver, Int, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { ResReq } from "../interfaces/interfaces";
import { isAuth } from "../middleware/isAuth";
import { isCoach } from "../middleware/isCoach";
import { TeamModel } from "../entities/Team";
import { Post } from "../entities/Post";
import { Comment } from "../entities/Comment";
import { ObjectID } from "mongodb";
import { isMember } from "../middleware/isMember";
import { LikesMapModel } from "../entities/LikesMap";
import { isCoachPayload } from "../middleware/isCoachPayload";
import { getIDfromToken } from "../middleware/getIDfromToken";
import { User, UserModel } from "../entities/User";
import { isMemberPayload } from "../middleware/isMemberPayload";

@Resolver(() => Post)
export class PostResolver {
    @Query(() => [Post])
    @UseMiddleware(getIDfromToken, isMemberPayload)
    async getPosts(
        @Arg("teamID") teamID: string,
        @Arg("skip", () => Int) skip: number,
        @Arg("limit", () => Int) limit: number,
        @Ctx() { payload }: ResReq,
    ): Promise<Post[]> {
        let team: any;
        if (!payload.isMember) {
            team = await TeamModel.aggregate([
                { $match: { _id: new ObjectID(teamID) } },
                { $project: { posts: 1 } },
                { $unwind: "$posts" },
                { $match: { "posts.isPrivate": false } },
                { $sort: { "posts.isPined": -1, "posts.creationDate": -1 } },
                { $skip: skip },
                { $limit: limit },
            ]);
        } else {
            team = await TeamModel.aggregate([
                { $match: { _id: new ObjectID(teamID) } },
                { $project: { posts: 1 } },
                { $unwind: "$posts" },
                { $sort: { "posts.isPined": -1, "posts.creationDate": -1 } },
                { $skip: skip },
                { $limit: limit },
            ]);
        }
        team = team.map(({ posts }: { posts: Post; _id: string }) => posts);
        return team;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth, isCoach)
    async pinPost(@Arg("teamID") teamID: string, @Arg("postID") postID: string, @Arg("isPined") isPined: boolean) {
        try {
            await TeamModel.findByIdAndUpdate(
                teamID,
                { $set: { "posts.$[element].isPined": isPined } },
                { arrayFilters: [{ "element._id": postID }] },
            );
        } catch (e) {
            console.log(e);
            return false;
        }
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth, isCoach)
    async setPostPrivate(
        @Arg("teamID") teamID: string,
        @Arg("postID") postID: string,
        @Arg("isPrivate") isPrivate: boolean,
    ) {
        try {
            await TeamModel.findByIdAndUpdate(
                teamID,
                { $set: { "posts.$[element].isPrivate": isPrivate } },
                { arrayFilters: [{ "element._id": postID }] },
            );
        } catch (e) {
            console.log(e);
            return false;
        }
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async likePost(@Arg("postID") postID: string, @Ctx() { payload }: ResReq) {
        const removed = await LikesMapModel.findOneAndRemove({ "_id.post": postID });
        if (removed) return true;
        try {
            const likesPair = new LikesMapModel({
                _id: {
                    post: postID,
                    user: payload._id,
                },
            });
            await likesPair.save();
        } catch (err) {
            console.log(err);
            return false;
        }
        return true;
    }

    @Mutation(() => Post)
    @UseMiddleware(isAuth, isMember)
    async addPost(
        @Arg("teamID") teamID: string,
        @Arg("content") content: string,
        @Ctx() { payload }: ResReq,
        @Arg("isPrivate", { nullable: true }) isPrivate?: boolean,
        @Arg("imgUrls", () => [String], { nullable: true }) imgUrls?: string[],
    ): Promise<Post> {
        const team = await TeamModel.findById(teamID);
        if (!team) throw new Error("Team not found");
        try {
            const post = new Post();
            post.content = content;
            post.user = new ObjectID(payload._id);
            if (isPrivate) {
                post.isPrivate = isPrivate;
            }
            if (imgUrls) {
                post.imgUrls = imgUrls;
            }
            team.posts.push(post);
            await team.save();
            const postID = team.posts[team.posts.length - 1]._id;
            const posts = await TeamModel.aggregate([
                { $match: { _id: new ObjectID(teamID) } },
                { $project: { posts: 1 } },
                { $unwind: "$posts" },
                { $match: { "posts._id": new ObjectID(postID) } },
            ]);
            return posts[0].posts;
        } catch (e) {
            console.log(e);
            throw new Error("Server Error");
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth, isMember)
    async addPostComment(
        @Arg("teamID") teamID: string,
        @Arg("content") content: string,
        @Ctx() { payload }: ResReq,
        @Arg("postID") postID: string,
    ) {
        const team = await TeamModel.findById(teamID);
        if (!team) return false;
        try {
            const comment = new Comment();
            comment.content = content;
            comment.user = new ObjectID(payload._id);
            const posts = team.posts;
            posts.find((post: Post) => {
                if (post._id.toString() === postID) {
                    post.comments.push(comment);
                }
            });
            team.posts = posts;
            await team.save();
        } catch (e) {
            console.log(e);
            return false;
        }
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth, isCoachPayload)
    async deletePost(@Arg("teamID") teamID: string, @Arg("postID") postID: string, @Ctx() { payload }: ResReq) {
        try {
            let deleted;
            if (payload && payload._id && payload.isCoach) {
                deleted = await TeamModel.findByIdAndUpdate(
                    teamID,
                    {
                        $pull: { posts: { _id: new ObjectID(postID) } },
                    },
                    { new: true },
                );
            } else {
                deleted = await TeamModel.findByIdAndUpdate(teamID, {
                    $pull: { posts: { _id: new ObjectID(postID), user: new ObjectID(payload._id) } },
                });
            }
            if (!deleted) return false;
        } catch (e) {
            console.log(e);
            return false;
        }
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth, isCoach)
    async editPost(@Arg("teamID") teamID: string, @Arg("postID") postID: string, @Arg("content") content: string) {
        try {
            await TeamModel.findByIdAndUpdate(
                teamID,
                { $set: { "posts.$[element].content": content } },
                { arrayFilters: [{ "element._id": postID }] },
            );
        } catch (e) {
            console.log(e);
            return false;
        }
        return true;
    }

    @FieldResolver(() => User)
    async user(@Root() post: Post): Promise<User> {
        const user = await UserModel.findById(post.user);
        if (user) {
            return user;
        } else {
            throw new Error("User not found");
        }
    }
}
