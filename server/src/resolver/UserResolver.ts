// import { Resolver, Query, Mutation, Arg, ObjectType, Field, Ctx, UseMiddleware, Int } from "type-graphql";
import { Resolver, Mutation, Query, Arg, ObjectType, Field, Ctx, UseMiddleware } from "type-graphql";
import { validPassword, createRefreshToken, sendRefreshToken, genPassword, createAccessToken } from "../lib/utils";
import { ResReq } from "../interfaces/interfaces";
import { User, UserModel } from "../entities/User";
import { isAuth } from "../middleware/isAuth";
import { verify } from "jsonwebtoken";
@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string;
    @Field(() => User)
    user: User | null;
}

@Resolver()
export class UserResolver {
    // @Query(() => String)
    // hello() {
    //   return "hi!";
    // }

    // @Query(() => String)
    // @UseMiddleware(isAuth)
    // bye(@Ctx() { payload }: MyContext) {
    //     console.log(payload);
    //     return `your user id is: ${payload!.userId}`;
    // }
    //
    @Query(() => [User])
    @UseMiddleware(isAuth)
    users() {
        return UserModel.find();
    }
    //
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
    //
    @Mutation(() => Boolean)
    async logout(@Ctx() { res }: ResReq) {
        sendRefreshToken(res, "");
        return true;
    }
    //
    // @Mutation(() => Boolean)
    // async revokeRefreshTokensForUser(@Arg("userId", () => Int) userId: number) {
    //     await getConnection().getRepository(User).increment({ id: userId }, "tokenVersion", 1);
    //
    //     return true;
    // }

    @Mutation(() => LoginResponse)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() { res, req }: ResReq,
    ): Promise<LoginResponse> {
        // console.log(email);
        const user = await UserModel.findOne({ email });
        const nullResponse: LoginResponse = { accessToken: "", user: null };
        if (!user) {
            res.status(401).json({ success: false, msg: "could not find user" });
            return nullResponse;
            // throw new Error("could not find user");
        } else {
            const isValid = validPassword(password, user.hash, user.salt);

            if (!isValid) {
                res.status(401).json({ success: false, msg: "you entered the wrong password" });
                return nullResponse;
                // throw new Error("you entered the wrong password");
            } else {
                sendRefreshToken(res, createRefreshToken(user));
            }
            // login successful
        }
        console.log(req.connection.remoteAddress);
        return {
            accessToken: createAccessToken(user!),
            user,
        };
    }

    @Mutation(() => Boolean)
    async register(
        @Arg("email") email: string,
        @Arg("name") name: string,
        @Arg("password") password: string,
        @Ctx() { res }: ResReq,
    ) {
        const user = await UserModel.findOne({ email });
        if (user) {
            res.status(409).json({ success: false, msg: "User already exist" });
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
                // res.status(200).json({ success: true, user: newUser });
            } catch (err) {
                console.log(err);
                return false;
            }
        }

        return true;
    }
}
