import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../app.js";

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
  it("returns a mailto URL for a valid contact request", async () => {
    const response = await request(app).post("/api/contact").send(validPayload).expect(200);

    expect(response.body).toMatchObject({
      success: true,
      message: "Email draft is ready."
    });
    expect(response.body.mailtoUrl).toContain("mailto:arthurdadalian@gmail.com?");
    expect(response.body.mailtoUrl).toContain("cc=sender%40example.com");
    expect(response.body.mailtoUrl).toContain("Portfolio+contact+from+Arthur+Dadalian");
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
