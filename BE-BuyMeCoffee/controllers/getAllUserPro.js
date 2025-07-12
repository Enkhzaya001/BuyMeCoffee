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
exports.getAllUserPro = void 0;
const prisma_1 = require("../utils/prisma");
const getAllUserPro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number(res.locals.userId);
    console.log(res.locals);
    console.log("Decoded userId:", userId);
    try {
        const getUserPro = yield prisma_1.prisma.profile.findMany({
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
});
exports.getAllUserPro = getAllUserPro;
