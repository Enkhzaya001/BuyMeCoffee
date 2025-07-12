import express from "express";
import { login, signUp, verify } from "../controllers/authcontroller";

export const UserRouter = express.Router();

UserRouter.post("/signup", signUp);

UserRouter.post("/login", login);
UserRouter.post("/verify", verify);
