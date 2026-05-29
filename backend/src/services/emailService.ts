import nodemailer from "nodemailer";
import { env, isEmailConfigured } from "../config/env.js";
import { AppError } from "../utils/AppError.js";
import type { ContactRequest } from "../utils/validation.js";

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
      "Email service is not configured. Please try again later.",
      "EMAIL_CONFIG_MISSING"
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: env.EMAIL_USER,
      to: env.OWNER_EMAIL,
      replyTo: data.email,
      subject: `New contact request from ${data.name}`,
      text: buildOwnerText(data),
      html: buildOwnerHtml(data)
    });

    await transporter.sendMail({
      from: env.EMAIL_USER,
      to: data.email,
      subject: "Copy of your message to Arthur Dadalian",
      text: buildCopyText(data),
      html: buildCopyHtml(data)
    });
  } catch (error) {
    throw new AppError(
      502,
      "Gmail SMTP could not send the contact emails. Please try again later.",
      "EMAIL_SEND_FAILED",
      error
    );
  }
}
