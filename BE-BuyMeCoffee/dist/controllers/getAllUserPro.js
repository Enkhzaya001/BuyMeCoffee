"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUserPro = void 0;
const prisma_1 = require("../utils/prisma");
const getAllUserPro = async (req, res) => {
    const userId = Number(res.locals.userId);
    console.log(res.locals);
    console.log("Decoded userId:", userId);
    try {
        const getUserPro = await prisma_1.prisma.profile.findMany({
            where: {
                userId: {
                    not: userId,
                },
            },
        });
        console.log(getUserPro);
        if (!getUserPro) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "Success", getUserPro });
        console.log(getUserPro, "data");
        return;
    }
    catch (err) {
        console.error("Error fetching profile:", err);
        res.status(500).json({ message: "Server error" });
        return;
    }
};
exports.getAllUserPro = getAllUserPro;
