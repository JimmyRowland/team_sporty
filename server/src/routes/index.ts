import { Router } from "express";
import refreshtokenRoute from "./refreshtoken";
const router = Router();
//
router.use("/", refreshtokenRoute);
//
export default router;
