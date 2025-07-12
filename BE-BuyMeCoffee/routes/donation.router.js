"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.donationRouter = void 0;
const express_1 = __importDefault(require("express"));
const donation_controller_1 = require("../controllers/donation.controller");
const getDoantion_1 = require("../controllers/getDoantion");
exports.donationRouter = express_1.default.Router();
exports.donationRouter.post("/donation/:userId", donation_controller_1.donationCreater);
exports.donationRouter.get("/getDonation/:id", getDoantion_1.getDonation);
