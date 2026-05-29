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

function numberFromEnv(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function stringFromEnv(value: string | undefined, fallback = "") {
  const normalized = value?.trim();

  if (!normalized || normalized === "\"\"" || normalized === "''") {
    return fallback;
  }

  return normalized;
}

export const env = {
  NODE_ENV: stringFromEnv(process.env.NODE_ENV, "development"),
  PORT: numberFromEnv(process.env.PORT, 5000),
  CLIENT_URL: stringFromEnv(process.env.CLIENT_URL, "http://localhost:5173"),
  VERCEL_URL: stringFromEnv(process.env.VERCEL_URL),
  EMAIL_USER: stringFromEnv(process.env.EMAIL_USER),
  EMAIL_PASS: stringFromEnv(process.env.EMAIL_PASS),
  OWNER_EMAIL: stringFromEnv(process.env.OWNER_EMAIL),
  OPENAI_API_KEY: stringFromEnv(process.env.OPENAI_API_KEY),
  OPENAI_MODEL: stringFromEnv(process.env.OPENAI_MODEL, "gpt-4.1-mini")
};

export function isEmailConfigured() {
  return Boolean(env.EMAIL_USER && env.EMAIL_PASS && env.OWNER_EMAIL);
}
