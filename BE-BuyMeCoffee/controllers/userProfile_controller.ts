import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { prisma } from "../utils/prisma";

export const userProfile = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, about, image, social, userId } = req.body;
  try {
    const isUserExist = await prisma.profile.findUnique({ where: { userId } });

    if (isUserExist) {
      await prisma.profile.update({
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
    } else {
      await prisma.profile.create({
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
