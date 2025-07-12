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
exports.userProfile = void 0;
const prisma_1 = require("../utils/prisma");
const userProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, about, image, social, userId } = req.body;
    try {
        const isUserExist = yield prisma_1.prisma.profile.findUnique({ where: { userId } });
        if (isUserExist) {
            yield prisma_1.prisma.profile.update({
                where: { userId },
                data: {
                    name,
                    about,
                    avatarImage: image,
                    socialMediaURL: social,
                    user: {
                        connect: { id: userId },
                    },
                },
            });
            return res.status(200).json({ message: "Profile is updated" });
        }
        else {
            yield prisma_1.prisma.profile.create({
                data: {
                    name,
                    about,
                    avatarImage: image,
                    socialMediaURL: social,
                    user: {
                        connect: { id: userId },
                    },
                },
            });
        }
        res.status(201).json({ message: "Profile created" });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.userProfile = userProfile;
