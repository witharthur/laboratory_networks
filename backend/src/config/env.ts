import dotenv from "dotenv";
import { existsSync } from "node:fs";
import path from "node:path";

const envFiles = [
  path.resolve(process.cwd(), ".env"),
  path.resolve(process.cwd(), "backend/.env"),
  path.resolve(process.cwd(), "../.env")
];

for (const envFile of envFiles) {
  if (existsSync(envFile)) {
    dotenv.config({ path: envFile, override: false });
  }
}

function stringFromEnv(value: string | undefined, fallback = "") {
  const normalized = value?.trim();

  if (!normalized || normalized === "\"\"" || normalized === "''") {
    return fallback;
  }

  return normalized;
}

function numberFromEnv(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export const env = {
  NODE_ENV: stringFromEnv(process.env.NODE_ENV, "development"),
  PORT: numberFromEnv(process.env.PORT, 5000),
  CLIENT_URL: stringFromEnv(process.env.CLIENT_URL, "http://localhost:5173"),
  VERCEL_URL: stringFromEnv(process.env.VERCEL_URL),
  OPENAI_API_KEY: stringFromEnv(process.env.OPENAI_API_KEY),
  OPENAI_MODEL: stringFromEnv(process.env.OPENAI_MODEL, "gpt-4.1-mini")
};
