import { Router } from "express";
import { UserModel } from "../entities/User";
import "dotenv/config";

const router = Router();
(() => {
    router.get(`/${process.env["TEAM_PATH_ENDPOINT "]}`, async (req, res) => {});
})();

export default router;
