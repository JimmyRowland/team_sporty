import {Arg, Ctx, Mutation} from "type-graphql";
import {ResReq} from "../interfaces/interfaces";
import {UserModel} from "../entities/User";
import {cloudinary} from "../lib/cloudinary";

export class UserUploadResolver {

    @Mutation(() => Boolean)
    async uploadAvatar(
        @Arg("_id") _id: string,
        @Arg("avatarUrl") avatarUrl: string,
        @Ctx() { res }: ResReq,
    ): Promise<Boolean> {
        try{
            const uploadResponse = await cloudinary.uploader.upload(avatarUrl,{upload_preset: 'ax8ca8dq',});
            console.log(uploadResponse);
            const message = await UserModel.updateOne({ _id }, { avatarUrl: uploadResponse.url });
            if(message === undefined){
                res.status(503).json({ success: false, message: "Server error" });
            }
            console.log(message);

        }
        catch(err){
            console.log(err);
            res.status(500).json({ success: false, message: err });
        }
        return true;
    }
}