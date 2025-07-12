import express from "express";
import { createOrUpdateBankCard } from "../controllers/payment.controller";
import verifyToken from "../middleware/verify-token";
import { getUserPayment } from "../controllers/getPayment.controller";

export const paymentRouter = express.Router();

paymentRouter.post("/bankcard", verifyToken, createOrUpdateBankCard);
paymentRouter.get("/getBankCart", getUserPayment);
