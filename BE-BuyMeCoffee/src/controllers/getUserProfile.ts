import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export const getUserPro = async (
  req: Request,
  res: Response
): Promise<void> => {
  // const userId = Number(res.locals.userId);
  // console.log("Decoded userId:", userId);

  const { id } = req.params;
  try {
    const getUserPro = await prisma.profile.findUnique({
      where: { userId: Number(id) },
    });

    if (!getUserPro) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "Success", getUserPro });
    console.log(getUserPro, "data");
    return;
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server error" });
    return;
  }
};
