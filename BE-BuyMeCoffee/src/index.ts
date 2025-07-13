import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { UserRouter } from "./routes/auth";
import { ProfilerRouter } from "./routes/profile.router";
import { paymentRouter } from "./routes/payment.router";
import { donationRouter } from "./routes/donation.router";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use(UserRouter);
app.use(ProfilerRouter);
app.use(paymentRouter);
app.use(donationRouter);

const PORT = process.env.PORT || 8000;

console.log(process.env.DATABASE_URL, "dataaa");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// import express, { Request, Response } from "express";
// import dotenv from "dotenv";
// import { prisma } from "./utils/prisma";

// const app = express();
// app.use(express.json());
// dotenv.config();

// app.get("/", async (_req: Request, res: Response) => {
//   console.log(process.env.DATABASE_URL, "env");

//   res.json("hello");
// });

// app.post("/createUser", async (_req: Request, res: Response) => {
//   await prisma.user.create({
//     data: {
//       username: "enhzaya",
//       email: "enh@gamil.com",
//       password: "Aa8899",
//     },
//   });
//   res.send("success");
// });

// app.listen(8000, () => {
//   console.log("Server is running on port 3000");
// });
