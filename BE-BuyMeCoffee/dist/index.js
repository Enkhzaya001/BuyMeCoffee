"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./routes/auth");
const profile_router_1 = require("./routes/profile.router");
const payment_router_1 = require("./routes/payment.router");
const donation_router_1 = require("./routes/donation.router");
dotenv_1.default.config();
const app = (0, express_1.default)();
// CORS configuration
app.use((0, cors_1.default)({
    origin: "*", // Allow all origins (you can restrict this in production)
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use(express_1.default.json());
app.use(auth_1.UserRouter);
app.use(profile_router_1.ProfilerRouter);
app.use(payment_router_1.paymentRouter);
app.use(donation_router_1.donationRouter);
// Test endpoint
app.get("/", (req, res) => {
    res.json({ message: "BuyMeCoffee API is running", timestamp: new Date().toISOString() });
});
// Health check endpoint
app.get("/health", async (req, res) => {
    try {
        const { prisma } = await Promise.resolve().then(() => __importStar(require("./utils/prisma")));
        await prisma.$queryRaw `SELECT 1`;
        res.json({ status: "ok", database: "connected" });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            database: "disconnected",
            error: error instanceof Error ? error.message : String(error)
        });
    }
});
const PORT = process.env.SERVER_PORT || 8000;
console.log("DATABASE_URL:", process.env.DATABASE_URL ? "✅ Set" : "❌ Not set");
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
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
