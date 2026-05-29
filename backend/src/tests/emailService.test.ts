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
  email: "arthur@example.com",
  comment: "I want to discuss a frontend project."
};

describe("email service", () => {
  beforeEach(() => {
    env.RESEND_API_KEY = "test_resend_key";
    env.RESEND_FROM_EMAIL = "onboarding@resend.dev";
    env.OWNER_EMAIL = "owner@example.com";
    resendMocks.send.mockReset();
    resendMocks.send.mockResolvedValue({ data: { id: "email-id" }, error: null });
  });

  it("sends one email to the owner and one copy to the sender", async () => {
    await sendContactEmails(payload);

    expect(resendMocks.send).toHaveBeenCalledTimes(2);
    expect(resendMocks.send).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        to: "owner@example.com",
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

  it("throws a safe error if Resend rejects either email", async () => {
    resendMocks.send
      .mockResolvedValueOnce({ data: { id: "owner-email" }, error: null })
      .mockResolvedValueOnce({ data: null, error: new Error("Rejected") });

    await expect(sendContactEmails(payload)).rejects.toMatchObject({
      statusCode: 502,
      code: "RESEND_SEND_FAILED",
      message: "Email provider did not accept the message. Please try again later."
    });
  });
});
