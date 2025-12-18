"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
// Provide a temporary `accelerateUrl` to satisfy the runtime constructor validation.
// This is a local workaround so the server can start — consider regenerating the Prisma
// client with a compatible engine or configuring an adapter for production use.
exports.prisma = new client_1.PrismaClient({ accelerateUrl: "http://localhost:4466" });
