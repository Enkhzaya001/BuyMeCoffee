"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfile = void 0;
const prisma_1 = require("../utils/prisma");
const userProfile = async (req, res) => {
    const { name, about, image, social, userId } = req.body;
    try {
        const isUserExist = await prisma_1.prisma.profile.findUnique({ where: { userId } });
        if (isUserExist) {
            await prisma_1.prisma.profile.update({
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
            await prisma_1.prisma.profile.create({
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
};
exports.userProfile = userProfile;
