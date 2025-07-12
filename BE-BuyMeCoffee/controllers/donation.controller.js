"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.donationCreater = void 0;
const prisma_1 = require("../utils/prisma");
const qrcode_1 = __importDefault(require("qrcode"));
const donationCreater = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { amount, specialMessage, socialURLOrBuyMeACoffee, donorId } = req.body;
    // const recipientId = parseInt(userId, 10);
    const amountInt = parseInt(amount, 10);
    // if (isNaN(recipientId)) {
    //   res.status(400).json({ message: "Invalid user ID." });
    //   return;
    // }
    if (!amount || !donorId) {
        res.status(400).json({ message: "Amount and donorId are required." });
        return;
    }
    console.log(req.body);
    try {
        const donation = yield prisma_1.prisma.donation.create({
            data: {
                amount: amountInt,
                specialMessage,
                socialURLOrBuyMeACoffee,
                donorId,
                recipientId: Number(userId),
            },
        });
        const url = `http://localhost:3002/payment/${userId}`;
        const qr = yield qrcode_1.default.toDataURL(url);
        res
            .status(200)
            .json({ message: "Donation created successfully.", donation, qr });
        return;
    }
    catch (error) {
        console.error("Donation creation error:", error);
        res.status(500).json({ message: "Server error while creating donation." });
        return;
    }
});
exports.donationCreater = donationCreater;
