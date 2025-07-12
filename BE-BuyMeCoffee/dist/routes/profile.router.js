"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilerRouter = void 0;
const express_1 = __importDefault(require("express"));
const verify_token_1 = __importDefault(require("../middleware/verify-token"));
const userProfile_controller_1 = require("../controllers/userProfile_controller");
const getUserProfile_1 = require("../controllers/getUserProfile");
const getAllUserPro_1 = require("../controllers/getAllUserPro");
exports.ProfilerRouter = express_1.default.Router();
exports.ProfilerRouter.post("/profile", verify_token_1.default, userProfile_controller_1.userProfile);
exports.ProfilerRouter.get("/getProfile/:id", getUserProfile_1.getUserPro);
exports.ProfilerRouter.get("/getAllProfile", verify_token_1.default, getAllUserPro_1.getAllUserPro);
