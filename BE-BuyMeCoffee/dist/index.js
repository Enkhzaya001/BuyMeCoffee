"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const auth_1 = require("./routes/auth");
const profile_router_1 = require("./routes/profile.router");
const payment_router_1 = require("./routes/payment.router");
const donation_router_1 = require("./routes/donation.router");
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient({ accelerateUrl: "http://localhost:4466" });
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(auth_1.UserRouter);
app.use(profile_router_1.ProfilerRouter);
app.use(payment_router_1.paymentRouter);
app.use(donation_router_1.donationRouter);
const PORT = process.env.SERVER_PORT || 8000;
console.log(process.env.DATABASE_URL, "dataaa");
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// import express, { Request, Response } from "express";
// import dotenv from "dotenv";
// import { prisma } from "./utils/prisma";
// const app = express();
// app.use(express.json());
// dotenv.config();
// app.get("/", async (_req: Request, res: Response) => {
//   console.log(process.env.DATABASE_URL, "env");
//   res.json("hello");
// });
// app.post("/createUser", async (_req: Request, res: Response) => {
//   await prisma.user.create({
//     data: {
//       username: "enhzaya",
//       email: "enh@gamil.com",
//       password: "Aa8899",
//     },
//   });
//   res.send("success");
// });
// app.listen(8000, () => {
//   console.log("Server is running on port 3000");
// });
