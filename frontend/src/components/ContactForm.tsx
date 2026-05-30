import { FormEvent, useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import type { LocalizedContent } from "../data/content";

type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  comment: string;
};

type FieldName = keyof ContactPayload;
type FieldErrors = Partial<Record<FieldName, string>>;
type FormStatus = "idle" | "success" | "error";

const initialValues: ContactPayload = {
  name: "",
  phone: "",
  email: "",
  comment: ""
};

function validate(values: ContactPayload, messages: LocalizedContent["contactForm"]["errors"]): FieldErrors {
  const errors: FieldErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\+?[0-9][0-9\s().-]{6,20}$/;

  if (values.name.trim().length === 0) {
    errors.name = messages.name;
  }

  if (!phonePattern.test(values.phone.trim())) {
    errors.phone = messages.phone;
  }

  if (!emailPattern.test(values.email.trim())) {
    errors.email = messages.email;
  }

  if (values.comment.trim().length === 0) {
    errors.comment = messages.comment;
  }

  return errors;
}

type ContactFormProps = {
  content: LocalizedContent["contactForm"];
};

const ownerEmail = "arthurdadalian@gmail.com";

function buildMailtoUrl(values: ContactPayload) {
  const subject = `Portfolio contact from ${values.name}`;
  const body = [
    "New contact request",
    "",
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    `Email: ${values.email}`,
    "",
    "Comment:",
    values.comment
  ].join("\n");

  const params = new URLSearchParams({
    cc: values.email,
    subject,
    body
  });

  return `mailto:${ownerEmail}?${params.toString()}`;
}

export function ContactForm({ content }: ContactFormProps) {
  const [values, setValues] = useState<ContactPayload>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  const fields = useMemo(
    () =>
      [
        { name: "name", label: content.fields.name, type: "text", autoComplete: "name" },
        { name: "phone", label: content.fields.phone, type: "tel", autoComplete: "tel" },
        { name: "email", label: content.fields.email, type: "email", autoComplete: "email" }
      ] as const,
    [content.fields.email, content.fields.name, content.fields.phone]
  );

  function handleChange(field: FieldName, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));

    setStatus("idle");
    setMessage("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values, content.errors);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setMessage(content.errors.form);
      return;
    }

    const normalizedValues = {
      name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      comment: values.comment.trim()
    };

    window.location.href = buildMailtoUrl(normalizedValues);
    setValues(initialValues);
    setErrors({});
    setStatus("success");
    setMessage(content.successCopySent);
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
        <label htmlFor="comment">{content.fields.comment}</label>
        <textarea
          id="comment"
          name="comment"
          rows={5}
          value={values.comment}
          onChange={(event) => handleChange("comment", event.target.value)}
          aria-invalid={Boolean(errors.comment)}
          aria-describedby={errors.comment ? "comment-error" : undefined}
        />
        {errors.comment ? (
          <p className="form-field__error" id="comment-error">
            {errors.comment}
          </p>
        ) : null}
      </div>

      <button className="button button--primary contact-form__submit" type="submit">
        <Send size={18} aria-hidden="true" />
        {content.submit}
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
