import { Field, InputType } from "type-graphql";
import { IsEmail, IsEnum, IsPhoneNumber, MaxLength, MinLength } from "class-validator";
import { SportEnum } from "./enum";

@InputType()
export class RegisterInput {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    @MinLength(12, { message: "Password must be at least 12 characters long" })
    password: string;

    @Field()
    @MaxLength(25)
    firstName: string;

    @Field()
    @MaxLength(25)
    lastName: string;
}

@InputType()
export class EditProfileInput {
    @Field()
    @MaxLength(25)
    firstName: string;

    @Field()
    @MaxLength(25)
    lastName: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @MaxLength(100)
    address: string;

    @Field()
    @IsPhoneNumber("CA", { message: "Phone number must be a Canadian phone number" })
    phone: string;

    @Field()
    @MaxLength(100)
    introduction: string;

    @Field()
    @IsEnum(SportEnum)
    sport: SportEnum;
}
