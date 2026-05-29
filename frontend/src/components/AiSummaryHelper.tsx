import { useState } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, Sparkles } from "lucide-react";
import { ApiError, generateAiSummary } from "../services/api";
import { defaultSummaryText } from "../data/content";

type Status = "idle" | "loading" | "success" | "error";

export function AiSummaryHelper() {
  const [text, setText] = useState(defaultSummaryText);
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleGenerate() {
    setStatus("loading");
    setMessage("");

    try {
      const response = await generateAiSummary(text);
      setSummary(response.summary);
      setMessage(response.source === "openai" ? "Summary ready." : "Draft summary ready.");
      setStatus("success");
    } catch (error) {
      setSummary("");
      setMessage(
        error instanceof ApiError
          ? error.message
          : "AI summary is unavailable. Please try again later."
      );
      setStatus("error");
    }
  }

  return (
    <div className="ai-helper" data-reveal>
      <div className="ai-helper__input">
        <label htmlFor="ai-summary-text">Profile text</label>
        <textarea
          id="ai-summary-text"
          value={text}
          maxLength={1500}
          onChange={(event) => setText(event.target.value)}
          rows={5}
        />
      </div>
      <button
        className="button button--primary"
        type="button"
        onClick={handleGenerate}
        disabled={status === "loading"}
        aria-busy={status === "loading"}
      >
        {status === "loading" ? (
          <LoaderCircle className="spin" size={18} aria-hidden="true" />
        ) : (
          <Sparkles size={18} aria-hidden="true" />
        )}
        Generate AI summary
      </button>
      <div className="ai-helper__result" aria-live="polite">
        {status === "success" ? (
          <>
            <p className="form-message form-message--success">
              <CheckCircle2 size={18} aria-hidden="true" />
              {message}
            </p>
            <p>{summary}</p>
          </>
        ) : null}
        {status === "error" ? (
          <p className="form-message form-message--error" role="alert">
            <AlertCircle size={18} aria-hidden="true" />
            {message}
          </p>
        ) : null}
      </div>
    </div>
  );
}
