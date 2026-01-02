"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
require("dotenv/config");
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    console.error("❌ DATABASE_URL environment variable is not set!");
    throw new Error("DATABASE_URL environment variable is not set");
}
const pool = new pg_1.Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 30000, // Increased timeout for Neon database
    ssl: connectionString.includes('neon.tech') ? {
        rejectUnauthorized: false // Neon requires SSL but allows self-signed
    } : undefined,
});
// Handle pool errors
pool.on("error", (err) => {
    console.error("❌ Database pool error:", err);
});
// Test connection on startup (non-blocking)
pool.query("SELECT 1")
    .then(() => {
    console.log("✅ Database connection successful");
})
    .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
    if (err.message.includes("ENOTFOUND") || err.message.includes("getaddrinfo")) {
        console.error("💡 DNS lookup failed - possible issues:");
        console.error("   1. Database endpoint might be incorrect or database was paused/deleted");
        console.error("   2. Check Neon dashboard for correct connection string");
        console.error("   3. Try using direct connection URL (without -pooler) instead");
        console.error("   4. Verify database is active in Neon dashboard");
    }
    else if (err.message.includes("timeout")) {
        console.error("💡 Tip: Connection timeout - check your network or try using direct connection URL instead of pooler");
    }
    const maskedUrl = connectionString.replace(/:[^:@]+@/, ":****@");
    console.error("Connection string:", maskedUrl);
    // Check if using pooler and suggest direct connection
    if (maskedUrl.includes("-pooler.")) {
        console.error("💡 Current URL uses pooler. Try direct connection URL from Neon dashboard.");
    }
});
const adapter = new adapter_pg_1.PrismaPg(pool);
exports.prisma = new client_1.PrismaClient({ adapter });
// import { PrismaClient } from "@prisma/client";
// // Provide a temporary `accelerateUrl` to satisfy the runtime constructor validation.
// // This is a local workaround so the server can start — consider regenerating the Prisma
// // client with a compatible engine or configuring an adapter for production use.
// export const prisma = new PrismaClient({
//   accelerateUrl: "http://localhost:4466",
// });
