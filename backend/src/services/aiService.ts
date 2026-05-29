import OpenAI from "openai";
import { env } from "../config/env.js";
import type { AiSummaryRequest } from "../utils/validation.js";

export type AiSummaryResult = {
  summary: string;
  source: "openai" | "fallback";
};

const fallbackProfile =
  "Arthur Dadalian is a frontend/full-stack developer focused on React, TypeScript, Node.js APIs, clean UI architecture, accessible forms, and practical AI-assisted development.";

const goalInstructions: Record<AiSummaryRequest["goal"], string> = {
  portfolio: "for the hero/about section of a personal developer portfolio",
  recruiter: "for a recruiter screening a frontend/full-stack developer",
  project: "for a project proposal that needs practical delivery confidence",
  linkedin: "for a concise LinkedIn About preview"
};

const fallbackSummaries: Record<AiSummaryRequest["goal"], string> = {
  portfolio:
    "Arthur Dadalian is a frontend/full-stack developer who builds polished React interfaces, reliable Node.js APIs, and complete product flows. He combines clean UI architecture with practical AI-assisted development to move from idea to working feature faster.",
  recruiter:
    "Arthur Dadalian is a frontend/full-stack developer with strong React, TypeScript, Node.js, validation, API, and deployment fundamentals. He is a good fit for teams that value readable code, product-minded UI, and careful end-to-end delivery.",
  project:
    "Arthur Dadalian can turn a product idea into a responsive interface connected to a reliable API, with validation, email delivery, and deployment-ready structure. His workflow emphasizes clear scope, fast iteration, and manual verification of real user flows.",
  linkedin:
    "Frontend/full-stack developer focused on React, TypeScript, Node.js APIs, accessible interfaces, and practical AI-assisted workflows. I like building clean product experiences that are easy to use, review, and deploy."
};

function fallbackSummary(goal: AiSummaryRequest["goal"]) {
  return fallbackSummaries[goal];
}

export async function generateProfessionalSummary({
  text,
  goal
}: AiSummaryRequest): Promise<AiSummaryResult> {
  const profileText = text?.trim() || fallbackProfile;

  if (!env.OPENAI_API_KEY || env.NODE_ENV === "test") {
    return {
      summary: fallbackSummary(goal),
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
        `Create a concise professional developer summary ${goalInstructions[goal]}. Return exactly 2 short sentences. Do not use markdown.`,
      input: `Developer profile:\n${profileText}`,
      max_output_tokens: 140
    });

    const summary = response.output_text?.trim();

    if (!summary) {
      return {
        summary: fallbackSummary(goal),
        source: "fallback"
      };
    }

    return {
      summary,
      source: "openai"
    };
  } catch {
    return {
      summary: fallbackSummary(goal),
      source: "fallback"
    };
  }
}
