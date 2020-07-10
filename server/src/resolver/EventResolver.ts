import { Resolver, Mutation, Query, Arg, Field, Ctx, UseMiddleware, ObjectType } from "type-graphql";

import { isAuth } from "../middleware/isAuth";

import { EventModel, Event } from "../entities/Event";
import { ResReq } from "../interfaces/interfaces";

@ObjectType()
class AddEventResponse {
    @Field(() => Event)
    event: Event | null;
}

@Resolver()
export class EventResolver {
    @Query(() => [Event])
    // @UseMiddleware(isAuth)
    events() {
        return EventModel.find();
    }

    @Mutation(() => AddEventResponse)
    @UseMiddleware(isAuth)
    async addEvent(
        @Arg("startDate") startDate: string,
        @Arg("hour") hour: number,
        @Arg("name") name: string,
        @Arg("description") description: string,
        @Ctx() { res }: ResReq,
    ): Promise<AddEventResponse> {
        const event = new EventModel({
            // startDate: new Date(),
            startDate: startDate,
            hour: hour,
            name: name,
            description: description,
            creationDate: new Date(),
            lastModifyDate: new Date(),
        });
        try {
            await event.save();
            // res.status(200).json({ success: true, user: newUser });
        } catch (err) {
            console.log(err);
            res.status(503).json({ success: false, message: "Server error" });
        }
        return { event };
    }
}
