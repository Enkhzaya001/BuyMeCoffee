import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { UserRouter } from "./routes/auth";
import { ProfilerRouter } from "./routes/profile.router";
import { paymentRouter } from "./routes/payment.router";
import { donationRouter } from "./routes/donation.router";

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: "*", // Allow all origins (you can restrict this in production)
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

app.use(UserRouter);
app.use(ProfilerRouter);
app.use(paymentRouter);
app.use(donationRouter);

// Test endpoint
app.get("/", (req, res) => {
  res.json({ message: "BuyMeCoffee API is running", timestamp: new Date().toISOString() });
});

// Health check endpoint
app.get("/health", async (req, res) => {
  try {
    const { prisma } = await import("./utils/prisma");
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", database: "connected" });
  } catch (error) {
    res.status(500).json({ 
      status: "error", 
      database: "disconnected",
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

const PORT = process.env.SERVER_PORT || 8000;

console.log("DATABASE_URL:", process.env.DATABASE_URL ? "✅ Set" : "❌ Not set");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
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
