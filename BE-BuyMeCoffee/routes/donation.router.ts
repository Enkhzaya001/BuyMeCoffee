import express from "express";
import { createOrUpdateBankCard } from "../controllers/payment.controller";
import verifyToken from "../middleware/verify-token";
import { donationCreater } from "../controllers/donation.controller";
import { getDonation } from "../controllers/getDoantion";

export const donationRouter = express.Router();

donationRouter.post("/donation/:userId", donationCreater);
donationRouter.get("/getDonation/:id", getDonation);
