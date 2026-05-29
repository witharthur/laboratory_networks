import OpenAI from "openai";
import { env } from "../config/env.js";
import { AppError } from "../utils/AppError.js";

export type AiSummaryResult = {
  summary: string;
  source: "openai" | "fallback";
};

const fallbackProfile =
  "Arthur Dadalian is a frontend/full-stack developer focused on React, TypeScript, Node.js APIs, clean UI architecture, accessible forms, and practical AI-assisted development.";

function fallbackSummary() {
  return "Arthur Dadalian is a frontend/full-stack developer who builds polished React interfaces, connects them to reliable Node.js APIs, and uses AI tools thoughtfully to improve delivery speed and product quality.";
}

export async function generateProfessionalSummary(text?: string): Promise<AiSummaryResult> {
  const profileText = text?.trim() || fallbackProfile;

  if (!env.OPENAI_API_KEY || env.NODE_ENV === "test") {
    return {
      summary: fallbackSummary(),
      source: "fallback"
    };
  }

  const client = new OpenAI({
    apiKey: env.OPENAI_API_KEY
  });

  try {
    const response = await client.responses.create({
      model: env.OPENAI_MODEL,
      instructions:
        "Create a concise professional developer summary. Return 2 short sentences. Do not use markdown.",
      input: `Profile text:\n${profileText}`,
      max_output_tokens: 140
    });

    const summary = response.output_text?.trim();

    if (!summary) {
      return {
        summary: fallbackSummary(),
        source: "fallback"
      };
    }

    return {
      summary,
      source: "openai"
    };
  } catch (error) {
    throw new AppError(
      502,
      "AI summary service is unavailable right now. Please try again later.",
      "OPENAI_REQUEST_FAILED",
      error
    );
  }
}
