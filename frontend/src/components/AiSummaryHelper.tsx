import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clipboard,
  LoaderCircle,
  RefreshCw,
  Sparkles,
  WandSparkles
} from "lucide-react";
import { ApiError, AiSummaryGoal, generateAiSummary } from "../services/api";
import { defaultSummaryText } from "../data/content";

type Status = "idle" | "loading" | "success" | "error";

const summaryGoals: Array<{ value: AiSummaryGoal; label: string }> = [
  { value: "portfolio", label: "Portfolio" },
  { value: "recruiter", label: "Recruiter" },
  { value: "project", label: "Project" },
  { value: "linkedin", label: "LinkedIn" }
];

export function AiSummaryHelper() {
  const [text, setText] = useState(defaultSummaryText);
  const [goal, setGoal] = useState<AiSummaryGoal>("portfolio");
  const [summary, setSummary] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleGenerate() {
    setStatus("loading");
    setMessage("");
    setCopied(false);

    try {
      const response = await generateAiSummary({ text, goal });
      setSummary(response.summary);
      setMessage(response.source === "openai" ? "Generated with OpenAI." : "Fallback draft ready.");
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

  async function handleCopy() {
    if (!summary) {
      return;
    }

    await navigator.clipboard.writeText(summary);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function handleReset() {
    setText(defaultSummaryText);
    setGoal("portfolio");
    setSummary("");
    setMessage("");
    setStatus("idle");
    setCopied(false);
  }

  return (
    <div className="ai-helper" data-reveal>
      <div className="ai-helper__header">
        <div className="ai-helper__title">
          <span aria-hidden="true">
            <WandSparkles size={22} />
          </span>
          <h3>AI summary studio</h3>
        </div>
        <span className="ai-helper__badge">{status === "loading" ? "Generating" : "Ready"}</span>
      </div>

      <div className="ai-helper__modes" aria-label="Summary goal">
        {summaryGoals.map((item) => (
          <button
            className={`ai-mode ${goal === item.value ? "ai-mode--active" : ""}`}
            type="button"
            key={item.value}
            onClick={() => setGoal(item.value)}
            aria-pressed={goal === item.value}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="ai-helper__workspace">
        <div className="ai-helper__panel ai-helper__input">
          <div className="ai-helper__field-heading">
            <label htmlFor="ai-summary-text">Profile text</label>
            <span>{text.length}/1500</span>
          </div>
          <textarea
            id="ai-summary-text"
            value={text}
            maxLength={1500}
            onChange={(event) => setText(event.target.value)}
            rows={7}
          />
          <div className="ai-helper__actions">
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
              Generate
            </button>
            <button className="button button--secondary" type="button" onClick={handleReset}>
              <RefreshCw size={18} aria-hidden="true" />
              Reset
            </button>
          </div>
        </div>

        <div className="ai-helper__panel ai-helper__result" aria-live="polite">
          <div className="ai-output__top">
            <span className={`ai-source ai-source--${status}`}>{message || "Waiting"}</span>
            <button
              className="button button--secondary button--compact"
              type="button"
              onClick={handleCopy}
              disabled={!summary}
            >
              <Clipboard size={17} aria-hidden="true" />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          {status === "success" ? (
            <>
              <p className="form-message form-message--success">
                <CheckCircle2 size={18} aria-hidden="true" />
                {message}
              </p>
              <p className="ai-output__text">{summary}</p>
            </>
          ) : null}
          {status === "error" ? (
            <p className="form-message form-message--error" role="alert">
              <AlertCircle size={18} aria-hidden="true" />
              {message}
            </p>
          ) : null}
          {status === "idle" ? (
            <p className="ai-output__empty">
              Arthur Dadalian builds frontend and full-stack flows with React, TypeScript,
              backend APIs, email delivery, and AI-assisted development.
            </p>
          ) : null}
          {status === "loading" ? (
            <div className="ai-output__loading" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
