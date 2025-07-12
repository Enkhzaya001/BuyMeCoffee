import express from "express";

import verifyToken from "../middleware/verify-token";
import { userProfile } from "../controllers/userProfile_controller";
import { getUserPro } from "../controllers/getUserProfile";
import { getAllUserPro } from "../controllers/getAllUserPro";

export const ProfilerRouter = express.Router();

ProfilerRouter.post("/profile", verifyToken, userProfile);
ProfilerRouter.get("/getProfile/:id", getUserPro);
ProfilerRouter.get("/getAllProfile", verifyToken, getAllUserPro);
