import { Field, InputType } from "type-graphql";
import { IsAlphanumeric, IsEmail, MaxLength, MinLength } from "class-validator";

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
