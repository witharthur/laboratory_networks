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
import type { LocalizedContent } from "../data/content";

type Status = "idle" | "loading" | "success" | "error";

const summaryGoalValues: AiSummaryGoal[] = ["portfolio", "recruiter", "project", "linkedin"];

type AiSummaryHelperProps = {
  content: LocalizedContent["aiHelper"];
};

export function AiSummaryHelper({ content }: AiSummaryHelperProps) {
  const [text, setText] = useState(content.defaultSummaryText);
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
      setMessage(response.source === "openai" ? content.openaiReady : content.fallbackReady);
      setStatus("success");
    } catch (error) {
      setSummary("");
      setMessage(
        error instanceof ApiError
          ? error.message
          : content.unavailable
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
    setText(content.defaultSummaryText);
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
          <h3>{content.title}</h3>
        </div>
        <span className="ai-helper__badge">
          {status === "loading" ? content.badgeLoading : content.badgeReady}
        </span>
      </div>

      <div className="ai-helper__modes" aria-label={content.goalLabel}>
        {summaryGoalValues.map((item) => (
          <button
            className={`ai-mode ${goal === item ? "ai-mode--active" : ""}`}
            type="button"
            key={item}
            onClick={() => setGoal(item)}
            aria-pressed={goal === item}
          >
            {content.goals[item]}
          </button>
        ))}
      </div>

      <div className="ai-helper__workspace">
        <div className="ai-helper__panel ai-helper__input">
          <div className="ai-helper__field-heading">
            <label htmlFor="ai-summary-text">{content.profileLabel}</label>
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
              {content.generate}
            </button>
            <button className="button button--secondary" type="button" onClick={handleReset}>
              <RefreshCw size={18} aria-hidden="true" />
              {content.reset}
            </button>
          </div>
        </div>

        <div className="ai-helper__panel ai-helper__result" aria-live="polite">
          <div className="ai-output__top">
            <span className={`ai-source ai-source--${status}`}>{message || content.waiting}</span>
            <button
              className="button button--secondary button--compact"
              type="button"
              onClick={handleCopy}
              disabled={!summary}
            >
              <Clipboard size={17} aria-hidden="true" />
              {copied ? content.copied : content.copy}
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
            <p className="ai-output__empty">{content.empty}</p>
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
