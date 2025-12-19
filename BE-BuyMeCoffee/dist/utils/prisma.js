"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.default = prisma;
// import { PrismaClient } from "@prisma/client";
// // Provide a temporary `accelerateUrl` to satisfy the runtime constructor validation.
// // This is a local workaround so the server can start — consider regenerating the Prisma
// // client with a compatible engine or configuring an adapter for production use.
// export const prisma = new PrismaClient({
//   accelerateUrl: "http://localhost:4466",
// });
