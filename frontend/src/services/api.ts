const rawApiUrl = import.meta.env.VITE_API_URL ?? "";
const API_BASE_URL = rawApiUrl.replace(/\/$/, "");

export type ApiSuccess = {
  success: true;
  message?: string;
};

export type AiSummaryResponse = ApiSuccess & {
  summary: string;
  source: "openai" | "fallback";
};

export type AiSummaryGoal = "portfolio" | "recruiter" | "project" | "linkedin";

export type AiSummaryPayload = {
  text: string;
  goal: AiSummaryGoal;
};

type ApiErrorPayload = {
  success?: false;
  error?: string;
  message?: string;
  code?: string;
  errors?: Record<string, string[]>;
};

export class ApiError extends Error {
  status?: number;
  code?: string;
  errors?: Record<string, string[]>;

  constructor(message: string, status?: number, code?: string, errors?: Record<string, string[]>) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.errors = errors;
  }
}

async function postJson<TResponse, TPayload>(path: string, payload: TPayload): Promise<TResponse> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
  } catch {
    throw new ApiError("Backend is unavailable. Please try again later.");
  }

  const data = (await response.json().catch(() => ({}))) as TResponse & ApiErrorPayload;

  if (!response.ok) {
    throw new ApiError(
      data.error ?? data.message ?? "Request failed. Please check the form and try again.",
      response.status,
      data.code,
      data.errors
    );
  }

  return data as TResponse;
}

export function generateAiSummary(payload: AiSummaryPayload) {
  return postJson<AiSummaryResponse, AiSummaryPayload>("/api/ai-summary", payload);
}
