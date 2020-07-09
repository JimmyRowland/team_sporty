// import MessageModel, { Message } from "../models/messages";
// // import {model} from "mongoose";
// import { Router } from "express";
//
// const router = Router();
//
// interface modifyMessageInput {
//     message: Message["message"];
//     _id: Message["_id"];
// }
//
// (() => {
//     async function addMessage({ message }: { message: string }): Promise<Message> {
//         return await MessageModel.create({
//             date: new Date(),
//             message,
//         });
//     }
//
//     async function deleteMessage({ _id }: { _id: string }): Promise<boolean> {
//         return MessageModel.deleteOne({ _id })
//             .then(() => {
//                 return true;
//             })
//             .catch((e) => {
//                 return false;
//             });
//     }
//
//     async function deleteAllMessage(): Promise<boolean> {
//         return MessageModel.deleteMany({})
//             .then(() => {
//                 return true;
//             })
//             .catch((e) => {
//                 return false;
//             });
//     }
//
//     async function modifyMessage({ _id, message }: modifyMessageInput): Promise<Message | null> {
//         const messageModel = await MessageModel.findOne({ _id });
//         if (messageModel) {
//             messageModel.message = message;
//             messageModel.date = new Date();
//             return messageModel.save();
//         } else {
//             return null;
//         }
//     }
//
//     router.post("/refresh_token", async (req, res) => {
//         const token = req.cookies.jid;
//         if (!token) {
//             return res.status(401).send({ ok: false, accessToken: "" });
//         }
//
//         let payload: any = null;
//         try {
//             payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
//         } catch (err) {
//             console.log(err);
//             return res.send({ ok: false, accessToken: "" });
//         }
//
//         // token is valid and
//         // we can send back an access token
//         const user = await User.findOne({ id: payload.userId });
//
//         if (!user) {
//             return res.send({ ok: false, accessToken: "" });
//         }
//
//         if (user.tokenVersion !== payload.tokenVersion) {
//             return res.send({ ok: false, accessToken: "" });
//         }
//
//         sendRefreshToken(res, createRefreshToken(user));
//
//         return res.send({ ok: true, accessToken: createAccessToken(user) });
//     });
// })();
//
// export default router;
