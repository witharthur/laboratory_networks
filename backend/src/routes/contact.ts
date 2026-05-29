import { Router } from "express";
import { sendContactEmails } from "../services/emailService.js";
import { contactSchema, formatZodErrors } from "../utils/validation.js";

export const contactRouter = Router();

contactRouter.post("/", async (req, res, next) => {
  const parsed = contactSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: "Please check the highlighted fields.",
      errors: formatZodErrors(parsed.error)
    });
    return;
  }

  try {
    await sendContactEmails(parsed.data);
    res.status(200).json({
      success: true,
      message: "Thanks! Your message has been sent. A copy was sent to your email."
    });
  } catch (error) {
    next(error);
  }
});
