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
    try {
        const user = await prisma_1.prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(400).json({ message: "User does not exist" });
            return;
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid password" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            email: user.email,
        }, process.env.JWT_SECRET
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
    }
    catch (err) {
        console.error("❌ Login error:", err);
        res.status(500).json({ error: "Login failed", details: err });
    }
    return;
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
