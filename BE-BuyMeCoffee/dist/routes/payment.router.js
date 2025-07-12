"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
const express_1 = __importDefault(require("express"));
const payment_controller_1 = require("../controllers/payment.controller");
const verify_token_1 = __importDefault(require("../middleware/verify-token"));
const getPayment_controller_1 = require("../controllers/getPayment.controller");
exports.paymentRouter = express_1.default.Router();
exports.paymentRouter.post("/bankcard", verify_token_1.default, payment_controller_1.createOrUpdateBankCard);
exports.paymentRouter.get("/getBankCart", getPayment_controller_1.getUserPayment);
