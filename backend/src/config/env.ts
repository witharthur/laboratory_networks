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

function booleanFromEnv(value: string | undefined) {
  const normalized = value?.trim().toLowerCase();

  if (!normalized) {
    return undefined;
  }

  return ["1", "true", "yes", "on"].includes(normalized);
}

const defaultOwnerEmail = "arthurdadalian@gmail.com";
const emailUser = stringFromEnv(process.env.EMAIL_USER, stringFromEnv(process.env.SMTP_USER));
const emailPass = stringFromEnv(process.env.EMAIL_PASS, stringFromEnv(process.env.SMTP_PASS));

export const env = {
  NODE_ENV: stringFromEnv(process.env.NODE_ENV, "development"),
  PORT: numberFromEnv(process.env.PORT, 5000),
  CLIENT_URL: stringFromEnv(process.env.CLIENT_URL, "http://localhost:5173"),
  VERCEL_URL: stringFromEnv(process.env.VERCEL_URL),
  EMAIL_USER: emailUser,
  EMAIL_PASS: emailPass,
  EMAIL_FROM: stringFromEnv(process.env.EMAIL_FROM, emailUser),
  SMTP_HOST: stringFromEnv(process.env.SMTP_HOST),
  SMTP_PORT: numberFromEnv(process.env.SMTP_PORT, 587),
  SMTP_SECURE: booleanFromEnv(process.env.SMTP_SECURE),
  OWNER_EMAIL: stringFromEnv(process.env.OWNER_EMAIL, defaultOwnerEmail),
  OPENAI_API_KEY: stringFromEnv(process.env.OPENAI_API_KEY),
  OPENAI_MODEL: stringFromEnv(process.env.OPENAI_MODEL, "gpt-4.1-mini")
};

export function isEmailConfigured() {
  return Boolean(env.EMAIL_USER && env.EMAIL_PASS && env.EMAIL_FROM && env.OWNER_EMAIL);
}
