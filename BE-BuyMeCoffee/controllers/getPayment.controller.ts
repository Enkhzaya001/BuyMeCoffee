import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export const getUserPayment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = res.locals.userId;

  console.log(res.locals, "loc");
  console.log("Decoded userId:", userId);

  try {
    const getUserPayment = await prisma.bankCard.findFirst({
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
  } catch (err) {
    console.error("Error fetching payment:", err);
    res.status(500).json({ message: "Server error" });
    return;
  }
};
