"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPayment = void 0;
const prisma_1 = require("../utils/prisma");
const getUserPayment = async (req, res) => {
    const userId = res.locals.userId;
    console.log(res.locals, "loc");
    console.log("Decoded userId:", userId);
    try {
        const getUserPayment = await prisma_1.prisma.bankCard.findFirst({
            where: { userId },
        });
        console.log(getUserPayment);
        if (!getUserPayment) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        console.log(getUserPayment);
        res.status(200).json({ message: "Success", getUserPayment });
        return;
    }
    catch (err) {
        console.error("Error fetching payment:", err);
        res.status(500).json({ message: "Server error" });
        return;
    }
};
exports.getUserPayment = getUserPayment;
