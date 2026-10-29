'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { z } from "zod";

import { reviewInputSchema } from "@/lib/review-schema";
import { HONEYPOT_FIELD } from "@/lib/spam";
import { REVIEW_SERVICES } from "@/lib/reviews-types";
import { submitReview } from "@/server/reviews";

const field =
  "w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none focus:border-primary";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

type FieldName = "name" | "role" | "rating" | "body" | "service" | "email";
type FieldErrors = Partial<Record<FieldName, string>>;

const FIELD_NAMES: readonly FieldName[] = [
  "name",
  "role",
  "rating",
  "body",
  "service",
  "email",
];

function fieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};

  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "");
    if (!FIELD_NAMES.includes(key as FieldName)) continue;

    const field = key as FieldName;
    if (!out[field]) out[field] = issue.message;
  }

  return out;
}

export function ReviewForm() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [renderedAt] = useState(() => Date.now());

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === "sending") return;

    const form = event.currentTarget;
    const values = new FormData(form);

    const candidate = {
      name: String(values.get("name") ?? ""),
      role: String(values.get("role") ?? ""),
      rating,
      body: String(values.get("body") ?? ""),
      service: String(values.get("service") ?? ""),
      email: String(values.get("email") ?? ""),
      [HONEYPOT_FIELD]: String(values.get(HONEYPOT_FIELD) ?? ""),
      elapsedMs: Date.now() - renderedAt,
    };

    const parsed = reviewInputSchema.safeParse(candidate);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      setStatus({ kind: "idle" });
      return;
    }

    setErrors({});
    setStatus({ kind: "sending" });

    try {
      const result = await submitReview(parsed.data);

      if (!result.ok) {
        setStatus({ kind: "error", message: result.error });
        return;
      }

      form.reset();
      setRating(0);
      setStatus({ kind: "sent" });
      router.refresh();
    } catch (error) {
      console.error("[reviews] submission failed:", error);
      setStatus({
        kind: "error",
        message: "We could not send that. Please check your connection and try again.",
      });
    }
  }

  if (status.kind === "sent") {
    return (
      <div className="panel p-7 text-center sm:p-9">
        <h3 className="font-display text-xl font-bold text-primary">Thank you — it is live.</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Your review is published on this page already. We read every one, and we do not edit
          them.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="btn-ghost mt-6"
        >
          Write another
        </button>
      </div>
    );
  }

  return (
    <form className="panel relative space-y-5 p-7 sm:p-9" onSubmit={handleSubmit} noValidate>
      <div>
        <h3 className="font-display text-xl font-bold">Leave a review.</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          If we have worked together, we would like to hear how it went — the good and the bad.
          Reviews appear on this page as soon as you submit them.
        </p>
      </div>

      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
        <input
          id={HONEYPOT_FIELD}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <fieldset>
        <legend className="text-xs text-muted-foreground">Your rating</legend>
        <div className="mt-2 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <label key={value} className="cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={value}
                checked={rating === value}
                onChange={() => setRating(value)}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className="block rounded px-0.5 text-3xl leading-none text-muted-foreground/40 transition-colors hover:text-primary/70 peer-checked:text-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary"
              >
                ★
              </span>
              <span className="sr-only">
                {value} star{value === 1 ? "" : "s"}
              </span>
            </label>
          ))}
          {rating > 0 && (
            <span className="ml-2 text-sm text-muted-foreground">{rating} of 5</span>
          )}
        </div>
        {errors.rating && <p className="mt-2 text-xs text-destructive">{errors.rating}</p>}
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs text-muted-foreground" htmlFor="review-name">
            Your name
          </label>
          <input
            id="review-name"
            name="name"
            className={`${field} mt-1.5`}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "review-name-error" : undefined}
          />
          {errors.name && (
            <p id="review-name-error" className="mt-1.5 text-xs text-destructive">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="text-xs text-muted-foreground" htmlFor="review-role">
            Role and company
          </label>
          <input
            id="review-role"
            name="role"
            className={`${field} mt-1.5`}
            placeholder="Marketing Lead, Acme"
            aria-invalid={Boolean(errors.role)}
            aria-describedby={errors.role ? "review-role-error" : undefined}
          />
          {errors.role && (
            <p id="review-role-error" className="mt-1.5 text-xs text-destructive">
              {errors.role}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="text-xs text-muted-foreground" htmlFor="review-service">
          Which service?
        </label>
        <select
          id="review-service"
          name="service"
          className={`${field} mt-1.5`}
          defaultValue=""
          aria-invalid={Boolean(errors.service)}
          aria-describedby={errors.service ? "review-service-error" : undefined}
        >
          <option value="" disabled>
            Choose a service
          </option>
          {REVIEW_SERVICES.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
        {errors.service && (
          <p id="review-service-error" className="mt-1.5 text-xs text-destructive">
            {errors.service}
          </p>
        )}
      </div>

      <div>
        <label className="text-xs text-muted-foreground" htmlFor="review-body">
          Your review
        </label>
        <textarea
          id="review-body"
          name="body"
          rows={5}
          className={`${field} mt-1.5`}
          aria-invalid={Boolean(errors.body)}
          aria-describedby={errors.body ? "review-body-error" : undefined}
        />
        {errors.body && (
          <p id="review-body-error" className="mt-1.5 text-xs text-destructive">
            {errors.body}
          </p>
        )}
      </div>

      <div>
        <label className="text-xs text-muted-foreground" htmlFor="review-email">
          Your email
        </label>
        <input
          id="review-email"
          name="email"
          type="email"
          className={`${field} mt-1.5`}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "review-email-error" : "review-email-hint"}
        />
        {errors.email ? (
          <p id="review-email-error" className="mt-1.5 text-xs text-destructive">
            {errors.email}
          </p>
        ) : (
          <p id="review-email-hint" className="mt-1.5 text-xs text-muted-foreground">
            For our records only — it is never shown on this page.
          </p>
        )}
      </div>

      <button type="submit" className="btn-primary w-full" disabled={status.kind === "sending"}>
        {status.kind === "sending" ? "Publishing…" : "Publish my review"}
      </button>

      <p aria-live="polite" className="text-center text-sm">
        {status.kind === "error" && <span className="text-destructive">{status.message}</span>}
      </p>
    </form>
  );
}
