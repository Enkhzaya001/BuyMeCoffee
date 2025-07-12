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
exports.getDonation = void 0;
const prisma_1 = require("../utils/prisma");
const getDonation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const userId = Number(res.locals.userId);
    // console.log("Decoded userId:", userId);
    const { id } = req.params;
    try {
        const getDonation = yield prisma_1.prisma.donation.findMany({
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
});
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
