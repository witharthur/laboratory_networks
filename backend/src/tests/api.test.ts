import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { app } from "../app.js";
import { sendContactEmails } from "../services/emailService.js";
import { AppError } from "../utils/AppError.js";

vi.mock("../services/emailService.js", () => ({
  sendContactEmails: vi.fn()
}));

const validPayload = {
  name: "Arthur Dadalian",
  phone: "+374 99 123 456",
  email: "sender@example.com",
  comment: "I want to discuss a frontend project."
};

describe("health API", () => {
  it("returns API status", async () => {
    const response = await request(app).get("/api/health").expect(200);

    expect(response.body).toMatchObject({
      success: true,
      message: "API is running."
    });
  });
});

describe("contact API", () => {
  beforeEach(() => {
    vi.mocked(sendContactEmails).mockReset();
    vi.mocked(sendContactEmails).mockResolvedValue(undefined);
  });

  it("accepts a valid contact request", async () => {
    const response = await request(app).post("/api/contact").send(validPayload).expect(200);

    expect(response.body).toEqual({ success: true });
    expect(sendContactEmails).toHaveBeenCalledWith(validPayload);
  });

  it("returns 400 for invalid contact data", async () => {
    const response = await request(app)
      .post("/api/contact")
      .send({ name: "", phone: "bad", email: "bad", comment: "" })
      .expect(400);

    expect(response.body.error).toBe("Please check the highlighted fields.");
    expect(response.body.errors).toHaveProperty("name");
    expect(response.body.errors).toHaveProperty("phone");
    expect(response.body.errors).toHaveProperty("email");
    expect(response.body.errors).toHaveProperty("comment");
    expect(sendContactEmails).not.toHaveBeenCalled();
  });

  it("returns 400 for malformed JSON", async () => {
    const response = await request(app)
      .post("/api/contact")
      .set("Content-Type", "application/json")
      .send("{")
      .expect(400);

    expect(response.body).toMatchObject({
      success: false,
      error: "Request body must be valid JSON.",
      message: "Request body must be valid JSON.",
      code: "INVALID_JSON"
    });
    expect(sendContactEmails).not.toHaveBeenCalled();
  });

  it("returns a clear status when email sending fails", async () => {
    vi.mocked(sendContactEmails).mockRejectedValueOnce(
      new AppError(503, "Email service is not configured. Please try again later.")
    );

    const response = await request(app).post("/api/contact").send(validPayload).expect(503);

    expect(response.body).toMatchObject({
      success: false,
      error: "Email service is not configured. Please try again later."
    });
  });
});

describe("AI summary API", () => {
  it("returns a fallback summary without an OpenAI key in tests", async () => {
    const response = await request(app)
      .post("/api/ai-summary")
      .send({ text: "React, TypeScript, Node.js and product-minded UI work.", goal: "recruiter" })
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.source).toBe("fallback");
    expect(response.body.summary).toContain("Arthur Dadalian");
  });

  it("validates AI summary goal", async () => {
    const response = await request(app)
      .post("/api/ai-summary")
      .send({ text: "React and Node.js", goal: "wrong" })
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.errors).toHaveProperty("goal");
  });
});
