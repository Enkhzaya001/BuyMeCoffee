import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { prisma } from "../utils/prisma";

dotenv.config();

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(400).json({ message: "User does not exist" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid password" });
      return;
    }
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET as string
      //   { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
    return;
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Login failed", details: err });
  }
  return;
};

export const signUp = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body, "body");
  const { email, password, username } = req.body;

  try {
    if (!email || !password || !username) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: passwordHash,
      },
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
      },
    });
    return;
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ error: "Signup failed", details: err });
    return;
  }
};

export const verify = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.body;
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }
    const isValid = jwt.verify(token, secret);
    if (isValid) {
      const destructToken: any = jwt.decode(token);
      // res.locals.userId = destructToken.userId;
      res.status(200).send({ destructToken });
      return;
    } else {
      res.status(401).json({ message: "token is not valid" });
      return;
    }
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token." });
    return;
  }
};
