import { Arg, Ctx, Int, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import {
    createAccessToken,
    createRefreshToken,
    genPassword,
    getGravatarUrl,
    sendRefreshToken,
    validPassword,
} from "../lib/utils";
import { ResReq } from "../interfaces/interfaces";
import { User, UserModel } from "../entities/User";
import { isAuth } from "../middleware/isAuth";
import { EditProfileInput, RegisterInput } from "../interfaces/inputType";
import { LoginResponse } from "../interfaces/responseType";
import { getIDfromToken } from "../middleware/getIDfromToken";

// TODO hide users query

@Resolver()
export class UserResolver {
    @Query(() => [User])
    @UseMiddleware(isAuth)
    users() {
        return UserModel.find();
    }

    @Query(() => User, { nullable: true })
    @UseMiddleware(getIDfromToken)
    me(@Ctx() { payload }: ResReq) {
        return UserModel.findById(payload._id);
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
    async register(@Arg("input") { email, firstName, lastName, password }: RegisterInput) {
        const user = await UserModel.findOne({ email });
        if (user) {
            return false;
        } else {
            const { hash, salt } = genPassword(password);
            const avatarUrl = getGravatarUrl(email);
            const newUser = new UserModel({
                hash: hash,
                salt: salt,
                creationDate: new Date(),
                lastLoginDate: new Date(),
                lastModifyDate: new Date(),
                firstName: firstName,
                lastName: lastName,
                email: email,
                avatarUrl: avatarUrl,
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

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async uploadAvatar(@Arg("avatarUrl") avatarUrl: string, @Ctx() { res, payload }: ResReq): Promise<boolean> {
        const _id = payload._id;
        try {
            const message = await UserModel.updateOne({ _id }, { avatarUrl: avatarUrl });
            if (!message) {
                res.status(503).json({ success: false, message: "Server error" });
            }
            console.log(message);
        } catch (err) {
            console.log(err);
            res.status(500).json({ success: false, message: err });
        }
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async uploadBanner(@Arg("bannerUrl") bannerUrl: string, @Ctx() { res, payload }: ResReq): Promise<boolean> {
        const _id = payload._id;
        try {
            console.log(bannerUrl);
            const message = await UserModel.updateOne({ _id }, { bannerUrls: bannerUrl });
            if (!message) {
                res.status(503).json({ success: false, message: "Server error" });
            }
            console.log(message);
        } catch (err) {
            console.log(err);
            res.status(500).json({ success: false, message: err });
        }
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async uploadIntro(@Arg("intro") intro: string, @Ctx() { res, payload }: ResReq): Promise<boolean> {
        const _id = payload._id;
        try {
            const message = await UserModel.updateOne({ _id }, { introduction: intro });
            if (!message) {
                res.status(503).json({ success: false, message: "Server error" });
            }
            console.log(message);
        } catch (err) {
            console.log(err);
            res.status(500).json({ success: false, message: err });
        }
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async editProfile(
        @Arg("input") { email, firstName, lastName, address, phone, introduction, sport }: EditProfileInput,
        @Ctx() { res, payload }: ResReq,
    ): Promise<boolean> {
        const _id = payload._id;
        try {
            const message = await UserModel.updateOne(
                { _id },
                {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    address: address,
                    phone: phone,
                    introduction: introduction,
                    sport: [sport],
                },
            );
            if (!message) {
                res.status(503).json({ success: false, message: "Server error" });
            }
            console.log(message);
        } catch (err) {
            console.log(err);
            res.status(500).json({ success: false, message: err });
        }
        return true;
    }
}
