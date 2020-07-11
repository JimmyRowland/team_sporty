import { Resolver, Query, Mutation, Arg, Ctx, ObjectType, Field } from "type-graphql";
import { Post, PostModel } from "../entities/Post";
import { ResReq } from "../interfaces/interfaces";

@ObjectType()
class PostResponse {
    @Field(() => Post)
    message: Post | null;
}

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    // @UseMiddleware(isAuth)
    messages() {
        return PostModel.find();
    }

    @Mutation(() => PostResponse)
    async newPost(
        @Arg("content") content: string,
        @Arg("user") user: string,
        @Arg("isPined") isPined: boolean,
        @Ctx() { res }: ResReq,
    ): Promise<PostResponse> {
        const message = new PostModel({
            creationDate: new Date(),
            content: content,
            user: user,
            isPined: isPined,
        });
        try {
            await message.save();
        } catch (err) {
            console.log(err);
            res.status(503).json({ success: false, message: "Server error" });
        }
        return { message };
    }

    @Mutation(() => Boolean)
    async pinPost(@Arg("_id") _id: string, @Arg("isPined") isPined: boolean, @Ctx() { res }: ResReq): Promise<boolean> {
        const message = await PostModel.updateOne({ _id }, { isPined: isPined });
        if (message === undefined) {
            res.status(503).json({ success: false, message: "Server error" });
        }
        console.log(message);
        return true;
    }
}
