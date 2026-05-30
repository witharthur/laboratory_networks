import { beforeEach, describe, expect, it, vi } from "vitest";
import { env } from "../config/env.js";
import { sendContactEmails } from "../services/emailService.js";

const nodemailerMocks = vi.hoisted(() => ({
  createTransport: vi.fn(),
  sendMail: vi.fn()
}));

vi.mock("nodemailer", () => ({
  default: {
    createTransport: nodemailerMocks.createTransport
  }
}));

const payload = {
  name: "Arthur Dadalian",
  phone: "+374 99 123 456",
  email: "sender@example.com",
  comment: "I want to discuss a frontend project."
};

describe("email service", () => {
  beforeEach(() => {
    env.EMAIL_USER = "arthur.gmail@example.com";
    env.EMAIL_PASS = "google-app-password";
    env.EMAIL_FROM = "arthur.gmail@example.com";
    env.SMTP_HOST = "";
    env.SMTP_PORT = 587;
    env.SMTP_SECURE = undefined;
    env.OWNER_EMAIL = "arthurdadalian@gmail.com";
    nodemailerMocks.createTransport.mockReset();
    nodemailerMocks.sendMail.mockReset();
    nodemailerMocks.createTransport.mockReturnValue({
      sendMail: nodemailerMocks.sendMail
    });
    nodemailerMocks.sendMail.mockResolvedValue({ messageId: "email-id" });
  });

  it("sends one Gmail SMTP email to the owner and one confirmation to the sender", async () => {
    await sendContactEmails(payload);

    expect(nodemailerMocks.createTransport).toHaveBeenCalledWith({
      service: "gmail",
      auth: {
        user: "arthur.gmail@example.com",
        pass: "google-app-password"
      },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000
    });
    expect(nodemailerMocks.sendMail).toHaveBeenCalledTimes(2);
    expect(nodemailerMocks.sendMail).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        from: "\"Arthur Dadalian\" <arthur.gmail@example.com>",
        to: "arthurdadalian@gmail.com",
        replyTo: payload.email,
        subject: `New contact request from ${payload.name}`
      })
    );
    expect(nodemailerMocks.sendMail).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        from: "\"Arthur Dadalian\" <arthur.gmail@example.com>",
        to: payload.email,
        replyTo: "arthurdadalian@gmail.com",
        subject: "Copy of your message to Arthur Dadalian"
      })
    );
  });

  it("uses generic SMTP settings when SMTP_HOST is configured", async () => {
    env.SMTP_HOST = "smtp.example.com";
    env.SMTP_PORT = 465;
    env.SMTP_SECURE = true;

    await sendContactEmails(payload);

    expect(nodemailerMocks.createTransport).toHaveBeenCalledWith({
      host: "smtp.example.com",
      port: 465,
      secure: true,
      auth: {
        user: "arthur.gmail@example.com",
        pass: "google-app-password"
      },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000
    });
  });

  it("throws a safe error if the email provider rejects an email", async () => {
    nodemailerMocks.sendMail.mockRejectedValueOnce(new Error("Authentication failed"));

    await expect(sendContactEmails(payload)).rejects.toMatchObject({
      statusCode: 502,
      code: "EMAIL_SEND_FAILED",
      message: "Email provider could not send the contact emails. Please try again later."
    });
    expect(nodemailerMocks.sendMail).toHaveBeenCalledTimes(2);
  });

  it("throws a safe error when Gmail SMTP configuration is missing", async () => {
    env.EMAIL_USER = "";
    env.EMAIL_PASS = "";
    env.EMAIL_FROM = "";

    await expect(sendContactEmails(payload)).rejects.toMatchObject({
      statusCode: 503,
      code: "EMAIL_CONFIG_MISSING",
      message: "Email service is not configured. Please try again later."
    });
    expect(nodemailerMocks.createTransport).not.toHaveBeenCalled();
    expect(nodemailerMocks.sendMail).not.toHaveBeenCalled();
  });
});
