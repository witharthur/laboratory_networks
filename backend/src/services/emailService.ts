import { Resend } from "resend";
import { env, isEmailConfigured } from "../config/env.js";
import { AppError } from "../utils/AppError.js";
import type { ContactRequest } from "../utils/validation.js";

type ContactEmailResult = {
  ownerSent: true;
  copySent: boolean;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildOwnerHtml(data: ContactRequest) {
  return `
    <h1>New contact request</h1>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Comment:</strong></p>
    <p>${escapeHtml(data.comment).replaceAll("\n", "<br />")}</p>
  `;
}

function buildCopyHtml(data: ContactRequest) {
  return `
    <h1>Thanks for your message, ${escapeHtml(data.name)}.</h1>
    <p>I received your request and will reply as soon as possible.</p>
    <p><strong>Your comment:</strong></p>
    <p>${escapeHtml(data.comment).replaceAll("\n", "<br />")}</p>
  `;
}

function buildOwnerText(data: ContactRequest) {
  return [
    "New contact request",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    "",
    data.comment
  ].join("\n");
}

function buildCopyText(data: ContactRequest) {
  return [
    `Thanks for your message, ${data.name}.`,
    "I received your request and will reply as soon as possible.",
    "",
    "Your comment:",
    data.comment
  ].join("\n");
}

export async function sendContactEmails(data: ContactRequest) {
  if (!isEmailConfigured()) {
    throw new AppError(
      503,
      "Email service is not configured yet. Please try again later.",
      "RESEND_CONFIG_MISSING"
    );
  }

  const resend = new Resend(env.RESEND_API_KEY);

  try {
    const ownerEmail = await resend.emails.send({
      from: `Arthur Dadalian Landing <${env.RESEND_FROM_EMAIL}>`,
      to: env.OWNER_EMAIL,
      replyTo: data.email,
      subject: `New contact request from ${data.name}`,
      text: buildOwnerText(data),
      html: buildOwnerHtml(data)
    });

    if (ownerEmail.error) {
      throw ownerEmail.error;
    }
  } catch (error) {
    throw new AppError(
      502,
      "Email provider did not accept the owner notification. Please try again later.",
      "RESEND_OWNER_SEND_FAILED",
      error
    );
  }

  const senderCopy = await resend.emails
    .send({
      from: `Arthur Dadalian <${env.RESEND_FROM_EMAIL}>`,
      to: data.email,
      subject: "Copy of your message to Arthur Dadalian",
      text: buildCopyText(data),
      html: buildCopyHtml(data)
    })
    .catch(() => ({ data: null, error: new Error("Sender copy failed") }));

  return {
    ownerSent: true,
    copySent: !senderCopy.error
  } satisfies ContactEmailResult;
}
