import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { Comment } from "../entities/Comment";
import { User, UserModel } from "../entities/User";
import { ResReq } from "../interfaces/interfaces";

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
}
