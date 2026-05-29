import type { ErrorRequestHandler, RequestHandler } from "express";
import { AppError } from "../utils/AppError.js";

type HttpParserError = Error & {
  status?: number;
  statusCode?: number;
  type?: string;
};

function isJsonParseError(error: unknown): error is HttpParserError {
  return (
    error instanceof SyntaxError &&
    typeof error === "object" &&
    error !== null &&
    "type" in error &&
    (error as HttpParserError).type === "entity.parse.failed"
  );
}

export const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found.",
    message: "Route not found."
  });
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      error: error.message,
      message: error.message,
      code: error.code
    });
    return;
  }

  if (isJsonParseError(error)) {
    res.status(400).json({
      success: false,
      error: "Request body must be valid JSON.",
      message: "Request body must be valid JSON.",
      code: "INVALID_JSON"
    });
    return;
  }

  res.status(500).json({
    success: false,
    error: "Unexpected server error. Please try again later.",
    message: "Unexpected server error. Please try again later."
  });
};
