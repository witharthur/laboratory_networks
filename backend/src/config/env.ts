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

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: numberFromEnv(process.env.PORT, 5000),
  CLIENT_URL: process.env.CLIENT_URL ?? "http://localhost:5173",
  VERCEL_URL: process.env.VERCEL_URL ?? "",
  SMTP_HOST: process.env.SMTP_HOST ?? "",
  SMTP_PORT: numberFromEnv(process.env.SMTP_PORT, 587),
  SMTP_USER: process.env.SMTP_USER ?? "",
  SMTP_PASS: process.env.SMTP_PASS ?? "",
  OWNER_EMAIL: process.env.OWNER_EMAIL ?? "",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY ?? "",
  OPENAI_MODEL: process.env.OPENAI_MODEL ?? "gpt-5.4-mini"
};

export function isSmtpConfigured() {
  return Boolean(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS && env.OWNER_EMAIL);
}
