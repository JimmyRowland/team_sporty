import { ObjectType, Field, ID } from "type-graphql";
import { prop, getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
@ObjectType()
export class CreationAndModificationDate {
    @Field(() => ID)
    readonly _id: ObjectId;

    @prop({ default: new Date() })
    creationDate: Date;

    @prop({ default: new Date() })
    lastModifyDate: Date;
}

export const CreationAndModificationDateModel = getModelForClass(CreationAndModificationDate);
