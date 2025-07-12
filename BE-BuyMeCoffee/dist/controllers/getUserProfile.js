"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPro = void 0;
const prisma_1 = require("../utils/prisma");
const getUserPro = async (req, res) => {
    // const userId = Number(res.locals.userId);
    // console.log("Decoded userId:", userId);
    const { id } = req.params;
    try {
        const getUserPro = await prisma_1.prisma.profile.findUnique({
            where: { userId: Number(id) },
        });
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
exports.getUserPro = getUserPro;
