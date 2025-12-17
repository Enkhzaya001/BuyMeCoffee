/// <reference types="node" />

import "dotenv/config"; // 🔥 ЭНЭ ХАМГИЙН ЧУХАЛ
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "src/prisma/schema.prisma",

  datasource: {
    url: process.env.DATABASE_URL!,
  },

  migrate: {
    datasource: {
      url: process.env.DATABASE_URL!,
    },
  },
} as any);
