import { z } from "zod";

const phonePattern = /^\+?[0-9][0-9\s().-]{6,20}$/;

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(80),
  phone: z.string().trim().min(1, "Phone is required.").regex(phonePattern, "Phone number is invalid.").max(24),
  email: z.string().trim().email("Email address is invalid.").max(120),
  comment: z.string().trim().min(1, "Comment is required.").max(2000)
});

export const aiSummarySchema = z.object({
  text: z.string().trim().max(1500, "Text must be 1500 characters or fewer.").optional().default(""),
  goal: z.enum(["portfolio", "recruiter", "project", "linkedin"]).optional().default("portfolio")
});

export type ContactRequest = z.infer<typeof contactSchema>;
export type AiSummaryRequest = z.infer<typeof aiSummarySchema>;

export function formatZodErrors(error: z.ZodError) {
  const fieldErrors: Record<string, string[]> = {};

  for (const issue of error.issues) {
    const field = issue.path[0];

    if (typeof field !== "string") {
      continue;
    }

    fieldErrors[field] ??= [];
    fieldErrors[field].push(issue.message);
  }

  return fieldErrors;
}
