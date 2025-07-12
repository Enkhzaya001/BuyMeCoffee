"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrUpdateBankCard = void 0;
const prisma_1 = require("../utils/prisma");
const createOrUpdateBankCard = async (req, res) => {
    const { country, firstName, lastName, cardNumber, expiryMonth, expiryYear, userId, } = req.body;
    try {
        const expiryDate = new Date(Number(expiryYear), Number(expiryMonth) - 1, 1);
        const existingCard = await prisma_1.prisma.bankCard.findUnique({
            where: { userId },
        });
        if (existingCard) {
            await prisma_1.prisma.bankCard.update({
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
            await prisma_1.prisma.bankCard.create({
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
};
exports.createOrUpdateBankCard = createOrUpdateBankCard;
