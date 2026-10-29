'use client';

import { useState } from "react";
import { services } from "@/lib/services-data";
import { contactDetails } from "@/lib/contact-details";

const field =
  "w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none focus:border-primary";

type SubmitStatus =
  | { state: "idle" }
  | { state: "opened" }
  | { state: "blocked"; whatsappHref: string; mailtoHref: string };

export function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus>({ state: "idle" });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = [
      "New enquiry from novamindai.info",
      `Name: ${String(data.get("name") ?? "")}`,
      `Email: ${String(data.get("email") ?? "")}`,
      `Company: ${String(data.get("company") ?? "")}`,
      `Phone: ${String(data.get("phone") ?? "")}`,
      `Interested in: ${String(data.get("interest") ?? "")}`,
      `Message: ${String(data.get("message") ?? "")}`,
    ].join("\n");

    const whatsappHref = `${contactDetails.whatsappHref}?text=${encodeURIComponent(text)}`;
    const mailtoHref = `mailto:${contactDetails.email}?subject=${encodeURIComponent(
      "New enquiry from novamindai.info",
    )}&body=${encodeURIComponent(text)}`;

    const win = window.open(whatsappHref, "_blank");
    if (win) win.opener = null;

    setStatus(win ? { state: "opened" } : { state: "blocked", whatsappHref, mailtoHref });
  }

  return (
    <form className="panel space-y-4 p-7" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs text-muted-foreground" htmlFor="name">
            Name
          </label>
          <input id="name" name="name" required className={`${field} mt-1.5`} />
        </div>
        <div>
          <label className="text-xs text-muted-foreground" htmlFor="email">
            Email
          </label>
          <input id="email" name="email" type="email" required className={`${field} mt-1.5`} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs text-muted-foreground" htmlFor="company">
            Company
          </label>
          <input id="company" name="company" className={`${field} mt-1.5`} />
        </div>
        <div>
          <label className="text-xs text-muted-foreground" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Your phone or WhatsApp"
            className={`${field} mt-1.5`}
          />
        </div>
      </div>
      <div>
        <label className="text-xs text-muted-foreground" htmlFor="interest">
          Interested in
        </label>
        <select id="interest" name="interest" className={`${field} mt-1.5`} defaultValue="">
          <option value="" disabled>
            Select a service
          </option>
          {services.map((s) => (
            <option key={s.title}>{s.title}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs text-muted-foreground" htmlFor="message">
          Message
        </label>
        <textarea id="message" name="message" rows={5} className={`${field} mt-1.5`} />
      </div>
      <button type="submit" className="btn-primary w-full">
        Send Message
      </button>
      <p className="text-center text-xs text-muted-foreground">
        Opens WhatsApp on{" "}
        <span className="font-semibold text-primary">{contactDetails.phone}</span>
      </p>
      <p aria-live="polite" className="text-center text-sm text-primary">
        {status.state === "opened" &&
          "WhatsApp is opening — send the message and we'll reply within 24 hours."}
        {status.state === "blocked" && (
          <>
            Your browser blocked the WhatsApp window.{" "}
            <a
              href={status.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline"
            >
              Open it here
            </a>{" "}
            or{" "}
            <a href={status.mailtoHref} className="font-semibold underline">
              email your enquiry
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}
