import { NextFunction, Request, Response } from "express";
import { prisma } from "../utils/prisma";
import QRCode from "qrcode";

export const donationCreater = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  const { amount, specialMessage, socialURLOrBuyMeACoffee, donorId } = req.body;

  // const recipientId = parseInt(userId, 10);
  const amountInt = parseInt(amount, 10);

  // if (isNaN(recipientId)) {
  //   res.status(400).json({ message: "Invalid user ID." });
  //   return;
  // }

  if (!amount || !donorId) {
    res.status(400).json({ message: "Amount and donorId are required." });
    return;
  }
  console.log(req.body);

  try {
    const donation = await prisma.donation.create({
      data: {
        amount: amountInt,
        specialMessage,
        socialURLOrBuyMeACoffee,
        donorId,
        recipientId: Number(userId),
      },
    });
    const url = `http://localhost:3002/payment/${userId}`;

    const qr = await QRCode.toDataURL(url);

    res
      .status(200)
      .json({ message: "Donation created successfully.", donation, qr });
    return;
  } catch (error) {
    console.error("Donation creation error:", error);
    res.status(500).json({ message: "Server error while creating donation." });
    return;
  }
};
