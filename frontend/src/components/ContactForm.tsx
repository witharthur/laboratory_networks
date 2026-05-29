import { FormEvent, useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { ApiError, ContactPayload, sendContact } from "../services/api";

type FieldName = keyof ContactPayload;
type FieldErrors = Partial<Record<FieldName, string>>;
type FormStatus = "idle" | "loading" | "success" | "error";

const initialValues: ContactPayload = {
  name: "",
  phone: "",
  email: "",
  comment: ""
};

function validate(values: ContactPayload): FieldErrors {
  const errors: FieldErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\+?[0-9][0-9\s().-]{6,20}$/;

  if (values.name.trim().length < 2) {
    errors.name = "Please enter at least 2 characters.";
  }

  if (!phonePattern.test(values.phone.trim())) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!emailPattern.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (values.comment.trim().length < 10) {
    errors.comment = "Please enter at least 10 characters.";
  }

  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<ContactPayload>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const isLoading = status === "loading";

  const fields = useMemo(
    () =>
      [
        { name: "name", label: "Name", type: "text", autoComplete: "name" },
        { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
        { name: "email", label: "Email", type: "email", autoComplete: "email" }
      ] as const,
    []
  );

  function handleChange(field: FieldName, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));

    if (status !== "loading") {
      setStatus("idle");
      setMessage("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setMessage("Please fix the highlighted fields.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await sendContact({
        name: values.name.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        comment: values.comment.trim()
      });

      setValues(initialValues);
      setErrors({});
      setStatus("success");
      setMessage(response.message);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof ApiError
          ? error.message
          : "Message could not be sent. Please try again later."
      );
    }
  }

  return (
    <form className={`contact-form contact-form--${status}`} onSubmit={handleSubmit} noValidate>
      {fields.map((field) => {
        const error = errors[field.name];
        const errorId = `${field.name}-error`;

        return (
          <div className="form-field" key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              value={values[field.name]}
              onChange={(event) => handleChange(field.name, event.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? errorId : undefined}
              disabled={isLoading}
            />
            {error ? (
              <p className="form-field__error" id={errorId}>
                {error}
              </p>
            ) : null}
          </div>
        );
      })}

      <div className="form-field">
        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          name="comment"
          rows={5}
          value={values.comment}
          onChange={(event) => handleChange("comment", event.target.value)}
          aria-invalid={Boolean(errors.comment)}
          aria-describedby={errors.comment ? "comment-error" : undefined}
          disabled={isLoading}
        />
        {errors.comment ? (
          <p className="form-field__error" id="comment-error">
            {errors.comment}
          </p>
        ) : null}
      </div>

      <button
        className="button button--primary contact-form__submit"
        type="submit"
        disabled={isLoading}
        aria-busy={isLoading}
      >
        {isLoading ? (
          <LoaderCircle className="spin" size={18} aria-hidden="true" />
        ) : (
          <Send size={18} aria-hidden="true" />
        )}
        Send message
      </button>

      <div aria-live="polite">
        {status === "success" ? (
          <p className="form-message form-message--success">
            <CheckCircle2 size={18} aria-hidden="true" />
            {message}
          </p>
        ) : null}
        {status === "error" && message ? (
          <p className="form-message form-message--error" role="alert">
            <AlertCircle size={18} aria-hidden="true" />
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
