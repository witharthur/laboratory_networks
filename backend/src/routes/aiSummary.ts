import { Router } from "express";
import { generateProfessionalSummary } from "../services/aiService.js";
import { aiSummarySchema, formatZodErrors } from "../utils/validation.js";

export const aiSummaryRouter = Router();

aiSummaryRouter.post("/", async (req, res, next) => {
  const parsed = aiSummarySchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: "Text is too long. Please shorten it and try again.",
      errors: formatZodErrors(parsed.error)
    });
    return;
  }

  try {
    const result = await generateProfessionalSummary(parsed.data.text);
    res.status(200).json({
      success: true,
      message: "Summary generated successfully.",
      summary: result.summary,
      source: result.source
    });
  } catch (error) {
    next(error);
  }
});
