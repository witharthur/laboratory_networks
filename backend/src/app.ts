import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { aiSummaryRouter } from "./routes/aiSummary.js";
import { contactRouter } from "./routes/contact.js";
import { AppError } from "./utils/AppError.js";

function isAllowedOrigin(origin: string) {
  const allowedOrigins = new Set([
    env.CLIENT_URL,
    "http://localhost:5173",
    "http://127.0.0.1:5173"
  ]);

  if (env.VERCEL_URL) {
    allowedOrigins.add(`https://${env.VERCEL_URL}`);
  }

  if (allowedOrigins.has(origin)) {
    return true;
  }

  try {
    const url = new URL(origin);
    return url.protocol === "https:" && url.hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

export const app = express();

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(new AppError(403, "Origin is not allowed by CORS.", "CORS_ORIGIN_DENIED"));
    }
  })
);

app.use(express.json({ limit: "32kb" }));

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running."
  });
});

app.use("/api/contact", contactRouter);
app.use("/api/ai-summary", aiSummaryRouter);

app.use(notFoundHandler);
app.use(errorHandler);
