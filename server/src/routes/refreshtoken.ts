import { Router } from "express";
import { verify, VerifyOptions } from "jsonwebtoken";
import { UserModel } from "../entities/User";
import { createAccessToken, createRefreshToken, sendRefreshToken } from "../lib/utils";
import { join } from "path";
import { readFileSync } from "fs";

const router = Router();
const pathToPubKey = join(__dirname, "..", "id_rsa_pub.pem");
const PUB_KEY = readFileSync(pathToPubKey, "utf8");

(() => {
    router.post("/refresh_token", async (req, res) => {
        const token = req.cookies.jid;
        if (!token) {
            return res.status(401).json({ success: false, msg: "Token does not exist", accessToken: "" });
        }

        let payload: any = null;
        const options: VerifyOptions = {
            algorithms: ["RS256"],
        };
        try {
            payload = verify(token, PUB_KEY!, options);
        } catch (err) {
            console.log(err);
            return res.status(401).json({ success: false, msg: "Invalid Token", accessToken: "" });
        }

        // token is valid and
        // we can send back an access token
        const user = await UserModel.findOne({ _id: payload._id });

        if (!user) {
            return res.status(401).json({ success: false, msg: "Invalid User", accessToken: "" });
        }

        if (user.tokenVersion !== payload.tokenVersion) {
            return res.send({ ok: false, accessToken: "" });
        }

        sendRefreshToken(res, createRefreshToken(user));

        return res.send({ ok: true, accessToken: createAccessToken(user) });
    });
})();

export default router;
