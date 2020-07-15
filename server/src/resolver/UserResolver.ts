// import { Resolver, Query, Mutation, Arg, ObjectType, Field, Ctx, UseMiddleware, Int } from "type-graphql";
import { Resolver, Mutation, Query, Arg, ObjectType, Field, Ctx, UseMiddleware, Int, InputType } from "type-graphql";
import { validPassword, createRefreshToken, sendRefreshToken, genPassword, createAccessToken } from "../lib/utils";
import { ResReq } from "../interfaces/interfaces";
import { User, UserModel } from "../entities/User";
import { isAuth } from "../middleware/isAuth";
import { verify } from "jsonwebtoken";
import { IsEmail, MaxLength, MinLength } from "class-validator";
@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string;
    @Field(() => User)
    user: User | null;
}
// TODO hide users query
@InputType()
class RegisterInput {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    @MinLength(12)
    password: string;

    @Field()
    @MaxLength(50)
    name: string;
}

@Resolver()
export class UserResolver {
    @Query(() => [User])
    @UseMiddleware(isAuth)
    users() {
        return UserModel.find();
    }

    @Query(() => User, { nullable: true })
    me(@Ctx() context: ResReq) {
        const authorization = context.req.headers["authorization"];

        if (!authorization) {
            return null;
        }

        try {
            const token = authorization.split(" ")[1];
            const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
            return UserModel.findOne(payload._id);
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async logout(@Ctx() { res, payload }: ResReq) {
        // console.log(payload);
        const user = await UserModel.findOne({ _id: payload?._id });
        if (!user) {
            res.status(409).json({ success: false, msg: "Error" });
            return false;
        } else {
            user.tokenVersion = (user.tokenVersion + 1) % 100;
            try {
                await user.save();
            } catch (err) {
                console.log(err);
            }
            sendRefreshToken(res, "");
            return true;
        }
    }

    @Mutation(() => Boolean)
    async revokeRefreshTokensForUser(@Arg("_id", () => Int) _id: number) {
        await UserModel.findByIdAndUpdate(_id, { $inc: { tokenVersion: 1 } });
        return true;
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() { res, req }: ResReq,
    ): Promise<LoginResponse> {
        const user = await UserModel.findOne({ email });
        const nullResponse: LoginResponse = { accessToken: "", user: null };
        if (!user) {
            return nullResponse;
        } else {
            const isValid = validPassword(password, user.hash, user.salt);

            if (!isValid) {
                return nullResponse;
            } else {
                sendRefreshToken(res, createRefreshToken(user));
            }
        }
        console.log(req.connection.remoteAddress);
        if (req.connection.remoteAddress && !user.ip.includes(req.connection.remoteAddress)) {
            user.ip.push(req.connection.remoteAddress);
        }
        user.lastLoginDate = new Date();
        try {
            user.save();
        } catch (e) {
            console.log(e);
        }
        return {
            accessToken: createAccessToken(user!),
            user,
        };
    }

    @Mutation(() => Boolean)
    async register(@Arg("input") { email, name, password }: RegisterInput, @Ctx() { res }: ResReq) {
        const user = await UserModel.findOne({ email });
        if (user) {
            return false;
        } else {
            const { hash, salt } = genPassword(password);
            const newUser = new UserModel({
                hash: hash,
                salt: salt,
                creationDate: new Date(),
                lastLoginDate: new Date(),
                lastModifyDate: new Date(),
                name: name,
                email: email,
            });
            try {
                await newUser.save();
            } catch (err) {
                console.log(err);
                return false;
            }
        }

        return true;
    }
}
