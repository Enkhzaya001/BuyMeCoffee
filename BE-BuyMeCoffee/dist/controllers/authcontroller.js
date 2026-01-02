"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.signUp = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const prisma_1 = require("../utils/prisma");
dotenv_1.default.config();
const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("LOGIN HIT");
    console.log("BODY:", req.body);
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Missing fields" });
        }
        const user = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        // Generate JWT token
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in environment variables.");
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, secret, { expiresIn: "7d" });
        return res.json({
            ok: true,
            token,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
            }
        });
    }
    catch (err) {
        console.error("LOGIN ERROR:", err);
        console.error("Error details:", err instanceof Error ? err.message : String(err));
        console.error("Error stack:", err instanceof Error ? err.stack : "No stack trace");
        return res.status(500).json({
            message: "Server error",
            error: err instanceof Error ? err.message : String(err)
        });
    }
};
exports.login = login;
const signUp = async (req, res) => {
    console.log(req.body, "body");
    const { email, password, username } = req.body;
    try {
        if (!email || !password || !username) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const existingUser = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: "Email already exists" });
            return;
        }
        const passwordHash = await bcryptjs_1.default.hash(password, 12);
        const newUser = await prisma_1.prisma.user.create({
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
    }
    catch (err) {
        console.error("❌ Signup error:", err);
        res.status(500).json({ error: "Signup failed", details: err });
        return;
    }
};
exports.signUp = signUp;
const verify = async (req, res) => {
    const { token } = req.body;
    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in environment variables.");
        }
        const isValid = jsonwebtoken_1.default.verify(token, secret);
        if (isValid) {
            const destructToken = jsonwebtoken_1.default.decode(token);
            // res.locals.userId = destructToken.userId;
            res.status(200).send({ destructToken });
            return;
        }
        else {
            res.status(401).json({ message: "token is not valid" });
            return;
        }
    }
    catch (err) {
        res.status(401).json({ message: "Invalid or expired token." });
        return;
    }
};
exports.verify = verify;
