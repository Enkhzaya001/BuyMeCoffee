"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const isValid = jsonwebtoken_1.default.verify(token, secret);
        if (isValid) {
            const destructToken = jsonwebtoken_1.default.decode(token);
            res.locals.userId = destructToken.userId;
            next();
            return;
        }
        else {
            res.status(401).json({ message: "Token is not valid" });
            return;
        }
    }
    catch (err) {
        res.status(401).json({ message: "Invalid or expired token." });
        return;
    }
});
exports.default = verifyToken;
