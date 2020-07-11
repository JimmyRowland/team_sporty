import { Resolver, Mutation, Query, Arg, ObjectType, Field, Ctx, UseMiddleware } from "type-graphql";
import { validPassword, createRefreshToken, sendRefreshToken, genPassword, createAccessToken } from "../lib/utils";
import { ResReq } from "../interfaces/interfaces";
import { User, UserModel } from "../entities/User";
import { isAuth } from "../middleware/isAuth";
import { verify } from "jsonwebtoken";
import { Team, TeamModel } from "../entities/Team";
import { isCoach } from "../middleware/isCoach";
// @ObjectType()
// class LoginResponse {
//     @Field()
//     accessToken: string;
//     @Field(() => User)
//     user: User | null;
// }

@Resolver()
export class TeamResolver {
    isMember(user: User, team: Team): boolean {
        return team.members.includes(user._id);
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth, isCoach)
    async addMember(@Arg("_id") _id: string, @Ctx() { res, payload }: ResReq) {
        const team = await TeamModel.findOne({ _id: payload?._id });
        const user = await UserModel.findOne({ _id: _id });
        if (!user) {
            res.status(409).json({ success: false, msg: "User does not exist" });
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
        if(this.isMember())
    }

    @Query(() => Team)
    getTeam(@Arg("_id") _id: string) {
        return TeamModel.findOne({ _id });
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async newTeam(@Arg("name") name: string, @Ctx() { res, payload }: ResReq) {
        const newTeam = new TeamModel({
            name: name,
            couches: [payload?._id],
        });
        try {
            await newTeam.save();
        } catch (err) {
            console.log(err);
            return false;
        }
        return true;
    }
}
