import { beforeEach, describe, expect, it, vi } from "vitest";
import { env } from "../config/env.js";
import { sendContactEmails } from "../services/emailService.js";

const resendMocks = vi.hoisted(() => ({
  send: vi.fn()
}));

vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(function ResendMock() {
    return {
      emails: {
        send: resendMocks.send
      }
    };
  })
}));

const payload = {
  name: "Arthur Dadalian",
  phone: "+374 99 123 456",
  email: "sender@example.com",
  comment: "I want to discuss a frontend project."
};

describe("email service", () => {
  beforeEach(() => {
    env.RESEND_API_KEY = "test_resend_key";
    env.RESEND_FROM_EMAIL = "onboarding@resend.dev";
    env.OWNER_EMAIL = "arthurdadalian@gmail.com";
    resendMocks.send.mockReset();
    resendMocks.send.mockResolvedValue({ data: { id: "email-id" }, error: null });
  });

  it("sends one email to the owner and one copy to the sender", async () => {
    const result = await sendContactEmails(payload);

    expect(result).toEqual({ ownerSent: true, copySent: true });
    expect(resendMocks.send).toHaveBeenCalledTimes(2);
    expect(resendMocks.send).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        to: "arthurdadalian@gmail.com",
        replyTo: payload.email,
        subject: `New contact request from ${payload.name}`
      })
    );
    expect(resendMocks.send).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        to: payload.email,
        subject: "Copy of your message to Arthur Dadalian"
      })
    );
  });

  it("keeps the owner request delivered if the sender copy is rejected", async () => {
    resendMocks.send
      .mockResolvedValueOnce({ data: { id: "owner-email" }, error: null })
      .mockResolvedValueOnce({ data: null, error: new Error("Rejected") });

    const result = await sendContactEmails(payload);

    expect(result).toEqual({ ownerSent: true, copySent: false });
    expect(resendMocks.send).toHaveBeenCalledTimes(2);
  });

  it("throws a safe error if Resend rejects the owner email", async () => {
    resendMocks.send.mockResolvedValueOnce({ data: null, error: new Error("Rejected") });

    await expect(sendContactEmails(payload)).rejects.toMatchObject({
      statusCode: 502,
      code: "RESEND_OWNER_SEND_FAILED",
      message: "Email provider did not accept the owner notification. Please try again later."
    });
    expect(resendMocks.send).toHaveBeenCalledTimes(1);
  });

  it("returns a setup error for Resend testing mode recipient restrictions", async () => {
    resendMocks.send.mockResolvedValueOnce({
      data: null,
      error: new Error(
        "You can only send testing emails to your own email address (darb4293@gmail.com)."
      )
    });

    await expect(sendContactEmails(payload)).rejects.toMatchObject({
      statusCode: 503,
      code: "RESEND_DOMAIN_NOT_VERIFIED",
      message:
        "Email service is in Resend testing mode. Verify a sending domain in Resend to deliver owner notifications."
    });
    expect(resendMocks.send).toHaveBeenCalledTimes(1);
  });

  it("throws a safe error when email configuration is missing", async () => {
    env.RESEND_API_KEY = "";
    env.OWNER_EMAIL = "";

    await expect(sendContactEmails(payload)).rejects.toMatchObject({
      statusCode: 503,
      code: "RESEND_CONFIG_MISSING",
      message: "Email service is not configured yet. Please try again later."
    });
    expect(resendMocks.send).not.toHaveBeenCalled();
  });
});
