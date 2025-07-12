import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access denied. Invalid token format." });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET || "BuyMeCoffee";
    const isValid = jwt.verify(token, secret);

    if (isValid) {
      const destructToken: any = jwt.decode(token);
      res.locals.userId = destructToken.userId;
      next();
      return;
    } else {
      res.status(401).json({ message: "Token is not valid" });
      return;
    }
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token." });
    return;
  }
};

export default verifyToken;
