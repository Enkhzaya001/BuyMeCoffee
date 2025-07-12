"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const authcontroller_1 = require("../controllers/authcontroller");
exports.UserRouter = express_1.default.Router();
exports.UserRouter.post("/signup", authcontroller_1.signUp);
exports.UserRouter.post("/login", authcontroller_1.login);
exports.UserRouter.post("/verify", authcontroller_1.verify);
