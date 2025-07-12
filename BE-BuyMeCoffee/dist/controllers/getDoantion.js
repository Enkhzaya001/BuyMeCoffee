"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDonation = void 0;
const prisma_1 = require("../utils/prisma");
const getDonation = async (req, res) => {
    // const userId = Number(res.locals.userId);
    // console.log("Decoded userId:", userId);
    const { id } = req.params;
    try {
        const getDonation = await prisma_1.prisma.donation.findMany({
            where: {
                recipientId: Number(id),
            },
            include: {
                donor: {
                    select: {
                        id: true,
                        profile: {
                            select: {
                                avatarImage: true,
                                name: true,
                            },
                        },
                    },
                },
            },
        });
        if (!getDonation) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "Success", getDonation });
        console.log(getDonation, "data");
        return;
    }
    catch (err) {
        console.error("Error fetching profile:", err);
        res.status(500).json({ message: "Server error" });
        return;
    }
};
exports.getDonation = getDonation;
// import { Request, Response } from "express";
// import { prisma } from "../../utils/prisma";
// export const getDonation = async (req: Request, res: Response) => {
//   const { userId } = req.params;
//   const allDonations = await prisma.donation.findMany({
//     where: {
//       recipientId: Number(userId),
//     },
//     include: {
//       donor: {
//         select: {
//           id: true,
//           profile: {
//             select: {
//               avatarImage: true,
//               name: true,
//             },
//           },
//         },
//       },
//     },
//   });
//   res.send({ allDonations });
// };
