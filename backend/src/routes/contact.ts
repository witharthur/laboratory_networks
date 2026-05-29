import { Router } from "express";
import { sendContactEmails } from "../services/emailService.js";
import { AppError } from "../utils/AppError.js";
import { contactSchema, formatZodErrors } from "../utils/validation.js";

export const contactRouter = Router();

contactRouter.post("/", async (req, res, next) => {
  const parsed = contactSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      error: "Please check the highlighted fields.",
      errors: formatZodErrors(parsed.error)
    });
    return;
  }

  try {
    await sendContactEmails(parsed.data);
    res.status(200).json({
      success: true
    });
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        error: error.message
      });
      return;
    }

    next(error);
  }
});
