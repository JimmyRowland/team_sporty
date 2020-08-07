import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Comment } from "../entities/Comment";
import { ResReq } from "../interfaces/interfaces";
import { isAuth } from "../middleware/isAuth";
import { LikesMapModel } from "../entities/LikesMap";
import { LikedPostResponse } from "../interfaces/responseType";

@Resolver(() => Comment)
export class LikesMapResolver {
    @Query(() => LikedPostResponse)
    @UseMiddleware(isAuth)
    async userLikedPost(@Arg("postID") postID: string, @Ctx() { payload }: ResReq) {
        const isliked = await LikesMapModel.findOne({ postID: postID, userID: payload._id });
        const likednum = await LikesMapModel.find({ postID: postID });
        const likedPostResponse = new LikedPostResponse();
        if (isliked) {
            likedPostResponse.isLiked = true;
        } else {
            likedPostResponse.isLiked = false;
        }
        likedPostResponse.likedNum = likednum.length;
        return likedPostResponse;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async likePost(@Arg("postID") postID: string, @Ctx() { payload }: ResReq) {
        const removed = await LikesMapModel.findOneAndRemove({ postID: postID, userID: payload._id });
        if (removed) return true;
        try {
            const likesPair = new LikesMapModel({
                postID: postID,
                userID: payload._id,
            });
            await likesPair.save();
        } catch (err) {
            console.log(err);
            return false;
        }
        return true;
    }
}
