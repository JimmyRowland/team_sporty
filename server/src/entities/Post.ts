import { ObjectType, Field, Root, Int } from "type-graphql";
import { index, prop, Ref } from "@typegoose/typegoose";
import { CreationAndModificationDate } from "./CreationAndModificationDate";
import { User } from "./User";
import { Comment } from "./Comment";
import { LikesMapModel } from "./LikesMap";
@ObjectType()
@index({ isPined: -1, creationDate: 1 })
@index({ isPined: -1, _id: 1 })
@index({ _id: 1 })
export class Post extends CreationAndModificationDate {
    @Field()
    @prop({ required: false })
    content: string;

    @Field(() => User)
    @prop({ Ref: User, required: true })
    user: Ref<User>;

    @Field(() => Boolean)
    @prop({ default: false })
    isPined: boolean;

    @Field(() => [Comment])
    @prop({ items: Comment, default: [] })
    comments: Comment[];

    @Field(() => Boolean)
    @prop({ default: false })
    isPrivate: boolean;

    @Field(() => [String])
    @prop({ default: [], items: String })
    imgUrls: string[];

    @Field(() => Int, { complexity: 4 })
    async numberOfLikes(@Root() post: Post): Promise<number> {
        const pairs = await LikesMapModel.find({ "_id.post": post._id });
        return pairs.length;
    }
}
