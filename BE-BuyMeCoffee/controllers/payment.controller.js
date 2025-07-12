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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrUpdateBankCard = void 0;
const prisma_1 = require("../utils/prisma");
const createOrUpdateBankCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { country, firstName, lastName, cardNumber, expiryMonth, expiryYear, userId, } = req.body;
    try {
        const expiryDate = new Date(Number(expiryYear), Number(expiryMonth) - 1, 1);
        const existingCard = yield prisma_1.prisma.bankCard.findUnique({
            where: { userId },
        });
        if (existingCard) {
            yield prisma_1.prisma.bankCard.update({
                where: { userId },
                data: {
                    country,
                    firstName,
                    lastName,
                    cardNumber,
                    expiryDate,
                },
            });
            return res.status(200).json({ message: "Bank card updated" });
        }
        else {
            yield prisma_1.prisma.bankCard.create({
                data: {
                    country,
                    firstName,
                    lastName,
                    cardNumber,
                    expiryDate,
                    user: {
                        connect: { id: userId },
                    },
                },
            });
            return res.status(201).json({ message: "Bank card created" });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.createOrUpdateBankCard = createOrUpdateBankCard;
