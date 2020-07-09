import { Router } from "express";
import passport from "passport";
// import messageRouter from "./messages";
const router = Router();
//
router.get(
    "/",
    passport.authenticate("jwt", { session: false }, (_req, _res, _next) => {}),
    (req, res) => {
        console.log(req, res);
        res.status(201).send("something");
    },
);
//
// export default router;
