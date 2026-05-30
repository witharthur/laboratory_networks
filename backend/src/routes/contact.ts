import { Router } from "express";
import type { ContactRequest } from "../utils/validation.js";
import { contactSchema, formatZodErrors } from "../utils/validation.js";

export const contactRouter = Router();

const ownerEmail = "arthurdadalian@gmail.com";

function buildMailtoUrl(data: ContactRequest) {
  const subject = `Portfolio contact from ${data.name}`;
  const body = [
    "New contact request",
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    "",
    "Comment:",
    data.comment
  ].join("\n");

  const params = new URLSearchParams({
    cc: data.email,
    subject,
    body
  });

  return `mailto:${ownerEmail}?${params.toString()}`;
}

contactRouter.post("/", (req, res) => {
  const parsed = contactSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      success: false,
      error: "Please check the highlighted fields.",
      errors: formatZodErrors(parsed.error)
    });
    return;
  }

  res.status(200).json({
    success: true,
    mailtoUrl: buildMailtoUrl(parsed.data),
    message: "Email draft is ready."
  });
});
