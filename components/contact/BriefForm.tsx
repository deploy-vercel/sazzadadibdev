"use client";

import { useId, useState } from "react";
import { site } from "@/data/site";
import { contactSection } from "@/data/home";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { pad } from "@/lib/utils";
import { SwipeToSend } from "./SwipeToSend";

type Fields = { name: string; email: string; idea: string };
type Errors = Partial<Record<keyof Fields, string>>;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Tell me what to call you.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "That email doesn't look right.";
  if (f.idea.trim().length < 10) e.idea = "A sentence or two is enough.";
  return e;
}

const labelClass = "mb-2 flex items-baseline gap-2 font-mono text-mini tracking-meta text-ink/40 uppercase";
const inputClass =
  "w-full border-b border-ink/15 bg-transparent px-0 py-3 text-ink/90 caret-accent outline-none transition-colors placeholder:text-ink/40 focus:border-accent/60";

/**
 * Message form. There's no backend: sending opens the visitor's email
 * client with the message already written, addressed to Sazzad.
 */
export function BriefForm() {
  const id = useId();
  const [fields, setFields] = useState<Fields>({ name: "", email: "", idea: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  function send() {
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`${id}-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    const subject = `[Portfolio] New message from ${fields.name}`;
    const body = `${fields.idea}\n\n— ${fields.name}\n${fields.email}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const field = (key: keyof Fields, index: number, label: string, el: React.ReactNode) => (
    <div>
      <label htmlFor={`${id}-${key}`} className={labelClass}>
        <span className="text-ink/25">{pad(index)}</span>
        {label}
        <span aria-hidden className="text-accent/70">
          *
        </span>
      </label>
      {el}
      {errors[key] && (
        <p id={`${id}-${key}-error`} className="mt-2 text-xs text-red-600 dark:text-red-400">
          {errors[key]}
        </p>
      )}
    </div>
  );

  const aria = (key: keyof Fields) => ({
    id: `${id}-${key}`,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${id}-${key}-error` : undefined,
    required: true,
  });

  return (
    <div className="border border-ink/10 bg-surface-3 p-6 shadow-lg lg:p-8">
      <SectionLabel className="mb-8">Send a message</SectionLabel>
      <form
        noValidate
        className="space-y-7"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        {field(
          "name",
          1,
          "Your name",
          <input
            {...aria("name")}
            autoComplete="name"
            placeholder="Full name"
            value={fields.name}
            onChange={set("name")}
            className={inputClass}
          />,
        )}
        {field(
          "email",
          2,
          "Your email",
          <input
            {...aria("email")}
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={fields.email}
            onChange={set("email")}
            className={inputClass}
          />,
        )}
        {field(
          "idea",
          3,
          "Your message",
          <textarea
            {...aria("idea")}
            rows={6}
            placeholder="Tell me about the role, the project, or even just a rough idea..."
            value={fields.idea}
            onChange={set("idea")}
            className="w-full resize-none border border-ink/15 bg-transparent px-4 py-3 text-ink/90 caret-accent outline-none transition-colors placeholder:text-ink/40 focus:border-accent/50"
          />,
        )}
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          <p className="flex max-w-[15rem] items-start gap-2.5 text-sm leading-relaxed text-ink/50" aria-live="polite">
            <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-fill" />
            {sent ? "Your email app should be open with the message ready — hit send there." : contactSection.formNote}
          </p>
          <SwipeToSend onSend={send} />
        </div>
      </form>
    </div>
  );
}
