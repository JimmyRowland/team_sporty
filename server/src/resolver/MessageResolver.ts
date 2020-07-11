import { Resolver, Query, Mutation, Arg, Ctx, ObjectType, Field } from "type-graphql";
import { Message, MessageModel } from "../entities/Message";
import { ResReq } from "../interfaces/interfaces";

@ObjectType()
class MessageResponse {
    @Field(() => Message)
    message: Message | null;
}

@Resolver()
export class MessageResolver {
    @Query(() => [Message])
    // @UseMiddleware(isAuth)
    messages() {
        return MessageModel.find();
    }

    @Mutation(() => MessageResponse)
    async postMessage(
        @Arg("content") content: string,
        @Arg("user") user: string,
        @Arg("isPined") isPined: boolean,
        @Ctx() { res }: ResReq,
    ): Promise<MessageResponse> {
        const message = new MessageModel({
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
    async updateMessagePin(
        @Arg("_id") _id: string,
        @Arg("isPined") isPined: boolean,
        @Ctx() { res }: ResReq,
    ): Promise<Boolean> {
        const message = await MessageModel.updateOne({ _id }, { isPined: isPined });
        if(message === undefined){
            res.status(503).json({ success: false, message: "Server error" });
        }
        console.log(message);
        return true;
    }
}
