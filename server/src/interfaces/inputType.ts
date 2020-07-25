import { Field, InputType } from "type-graphql";
import { IsAlphanumeric, IsEmail, IsEnum, IsPhoneNumber, MaxLength, MinLength } from "class-validator";
import { SportEnum } from "./enum";

@InputType()
export class RegisterInput {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    @MinLength(12)
    password: string;

    @Field()
    @MaxLength(25)
    @IsAlphanumeric()
    firstName: string;

    @Field()
    @MaxLength(25)
    @IsAlphanumeric()
    lastName: string;
}

@InputType()
export class EditProfileInput {
    @Field()
    @MaxLength(25)
    @IsAlphanumeric()
    firstName: string;

    @Field()
    @MaxLength(25)
    @IsAlphanumeric()
    lastName: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @MaxLength(100)
    @IsAlphanumeric()
    address: string;

    @Field()
    @IsPhoneNumber("CA")
    phone: string;

    @Field()
    @MaxLength(100)
    @IsAlphanumeric()
    introduction: string;

    @Field()
    @IsEnum(SportEnum)
    sport: SportEnum;
}
